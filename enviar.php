<?php
/**
 * Lead handler. The browser posts here; this file posts to VenderCRM with the
 * site's API key. The key never reaches the page — that is the whole reason
 * this indirection exists (vendercrm-lead-capture skill, rule 1).
 *
 * Contract, consumed by partials/lead-form.php and by the tool pages:
 *
 *   POST fields: name, company?, phone (required), email?, need, message?,
 *                source_page, form_id, idempotency_key, website (honeypot),
 *                service?, value_tier?, tool_result?,
 *                utm_source|utm_medium|utm_campaign|utm_term|utm_content,
 *                gclid?, fbclid?
 *
 *   LEAD VALUE ROUTING: every lead carries the service it came
 *   from and that service's value tier, resolved SERVER-SIDE from
 *   content/lead-values.php. The posted `value_tier` is never trusted — tier is
 *   set by the page, not by whoever posts the form,
 *   and a form field is the one thing on this request an attacker controls.
 *
 *   Optional: with RESEND_API_KEY + LEAD_NOTIFY_TO in config.php every accepted
 *   lead is also emailed to the firm (see notify_by_email).
 *
 *   Response: JSON {ok, degraded, error?} plus, on success, the lead's
 *   resolved {service, value_tier, value, currency} and the per-service
 *   thank-you copy, when the request asks for JSON (Accept: application/json).
 *   Otherwise a 303 redirect to /contacto/?enviado=1&s=<slug>, which renders
 *   the same thank-you server-side — so the form works with JavaScript
 *   disabled.
 *
 * DEGRADED MODE: with no VENDERCRM_URL / VENDERCRM_API_KEY in config.php, or
 * when the CRM is unreachable, the lead is appended to logs/leads.log and the
 * visitor still gets success with degraded: true. A visitor who filled in a form
 * and got an error page is a lost customer; a logged lead is a five-minute fix.
 *
 * This file is shared chrome: pages parameterise it, they do not edit it.
 */

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';

const LEAD_RATE_MAX     = 5;     // submissions per IP …
const LEAD_RATE_WINDOW  = 600;   // … per 10 minutes
const LEAD_CRM_TIMEOUT  = 10;    // seconds
const LEAD_SUCCESS_PATH = '/contacto/?enviado=1';

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

/**
 * Answer and stop: JSON for the fetch() path, a redirect for the plain form.
 */
function respond(bool $ok, bool $degraded, ?string $error = null, array $extra = []): never
{
    global $wantsJson;

    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 422);
        echo json_encode(
            array_filter(
                ['ok' => $ok, 'degraded' => $degraded, 'error' => $error],
                static fn ($v) => $v !== null
            ) + $extra,
            JSON_UNESCAPED_UNICODE
        );
        exit;
    }

    http_response_code(303);
    /* The thank-you is per service, so the no-JS path has to
       carry the slug across the redirect — /contacto/ renders it from the same
       content/lead-values.php record the inline success state uses. */
    $success = LEAD_SUCCESS_PATH;
    if (!empty($extra['service'])) {
        $success .= '&s=' . rawurlencode((string) $extra['service']);
    }

    header('Location: ' . ($ok ? $success : '/contacto/?error=1'));
    exit;
}

/**
 * Trimmed POST value, capped at the length VenderCRM accepts for that field.
 */
function field(string $key, int $max): string
{
    $value = $_POST[$key] ?? '';

    return is_string($value) ? mb_substr(trim($value), 0, $max) : '';
}

/**
 * The client IP, preferring the proxy header Hostinger sets.
 */
function client_ip(): string
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'] as $key) {
        if (!empty($_SERVER[$key]) && is_string($_SERVER[$key])) {
            return explode(',', $_SERVER[$key])[0];
        }
    }

    return 'unknown';
}

/**
 * File-based rate limit: at most LEAD_RATE_MAX submissions per IP per window.
 * No database, so one small JSON file per IP hash under logs/rate/.
 */
function rate_limited(string $ip): bool
{
    $dir = ROOT_DIR . '/logs/rate';
    if (!is_dir($dir) && !@mkdir($dir, 0775, true) && !is_dir($dir)) {
        return false;   // cannot track it — never block a real lead over this
    }

    $file  = $dir . '/' . hash('sha256', $ip) . '.json';
    $now   = time();
    $hits  = [];

    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $hits = array_filter(
                $decoded,
                static fn ($t) => is_int($t) && $t > $now - LEAD_RATE_WINDOW
            );
        }
    }

    if (count($hits) >= LEAD_RATE_MAX) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode(array_values($hits)), LOCK_EX);

    /* Opportunistic cleanup so logs/rate/ cannot grow without bound. */
    if (random_int(1, 50) === 1) {
        foreach (glob($dir . '/*.json') ?: [] as $stale) {
            if (@filemtime($stale) < $now - LEAD_RATE_WINDOW * 6) {
                @unlink($stale);
            }
        }
    }

    return false;
}

/**
 * Append the lead to logs/leads.log. Always called, so there is a local record
 * even when the CRM accepted it.
 */
function log_lead(array $payload, string $outcome): void
{
    $dir = ROOT_DIR . '/logs';
    if (!is_dir($dir) && !@mkdir($dir, 0775, true) && !is_dir($dir)) {
        return;
    }

    $line = json_encode(
        ['at' => gmdate('c'), 'outcome' => $outcome] + $payload,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    @file_put_contents($dir . '/leads.log', $line . "\n", FILE_APPEND | LOCK_EX);
}

/**
 * Email the lead to the firm through Resend, when configured. Runs after the
 * CRM decision and never changes the visitor's outcome: a failure is logged
 * and the visitor still sees success — the lead is already in leads.log.
 */
function notify_by_email(array $payload, string $outcome): void
{
    $apiKey = cfg('RESEND_API_KEY');
    $to     = cfg('LEAD_NOTIFY_TO');
    $from   = cfg('LEAD_FROM');

    if ($apiKey === null || $to === null || $from === null || !function_exists('curl_init')) {
        return;
    }

    $lines = [];
    foreach (['name' => 'Nombre', 'phone' => 'Teléfono', 'email' => 'Email', 'message' => 'Mensaje',
              'source' => 'Formulario', 'page_url' => 'Página'] as $key => $label) {
        if (!empty($payload[$key])) {
            $lines[] = $label . ': ' . $payload[$key];
        }
    }
    /* fields keys are lower-case identifiers; ucfirst() alone would put
       "Resultado_herramienta" in an email a person reads. */
    $fieldLabels = [
        'valor'                 => 'Tier',
        'servicio'              => 'Servicio',
        'necesita'              => 'Necesita',
        'empresa'               => 'Empresa',
        'resultado_herramienta' => 'Resultado de la herramienta',
        'etiqueta'              => 'Etiqueta',
        'formulario'            => 'Formulario',
    ];
    foreach (($payload['fields'] ?? []) as $key => $value) {
        $lines[] = ($fieldLabels[$key] ?? ucfirst((string) $key)) . ': ' . $value;
    }
    $lines[] = '';
    $lines[] = 'Estado CRM: ' . $outcome;
    $lines[] = 'Recibido: ' . gmdate('Y-m-d H:i') . ' UTC';

    /* "[Tier A] Nuevo contacto: Abrir una EAS — María": the two
       things that decide whether this one gets answered first are the tier and
       the service, so both go in the subject line. */
    $who      = $payload['name'] ?? $payload['phone'] ?? 'sin nombre';
    $tier     = $payload['fields']['valor'] ?? '';
    $servicio = $payload['fields']['servicio'] ?? '';
    $subject  = ($tier !== '' ? '[Tier ' . $tier . '] ' : '')
              . 'Nuevo contacto: '
              . ($servicio !== '' ? $servicio . ' — ' : '')
              . $who;
    $body    = json_encode(array_filter([
        'from'     => $from,
        'to'       => [$to],
        'reply_to' => $payload['email'] ?? null,
        'subject'  => mb_substr($subject, 0, 150),
        'text'     => implode("\n", $lines),
    ]), JSON_UNESCAPED_UNICODE);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKey,
        ],
        CURLOPT_POSTFIELDS => $body,
    ]);
    $response = curl_exec($ch);
    $status   = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr  = curl_error($ch);
    curl_close($ch);

    if ($status !== 200) {
        error_log(sprintf('Resend notification failed [%d] %s %s', $status, (string) $response, $curlErr));
    }
}

// --- 1. POST only ------------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    header('Location: /contacto/', true, 303);
    exit;
}

// --- 2. Honeypot: accept silently so the bot sees success and moves on -------
if (($_POST['website'] ?? '') !== '') {
    respond(true, true);
}

// --- 3. Same-origin check ----------------------------------------------------
// A cross-site POST is either a bot or a misconfiguration; either way it is not
// one of our forms. A request with neither header (some privacy setups) is let
// through — the honeypot and the rate limit still apply.
$origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
if ($origin !== '') {
    $originHost  = parse_url($origin, PHP_URL_HOST);
    $requestHost = parse_url(site_origin(), PHP_URL_HOST) ?: ($_SERVER['HTTP_HOST'] ?? '');

    if ($originHost !== null && strcasecmp($originHost, (string) $requestHost) !== 0) {
        respond(false, false, 'origin');
    }
}

// --- 4. Validate -------------------------------------------------------------
$phone = field('phone', 30);
$digits = preg_replace('/\D+/', '', $phone) ?? '';

/* Deliberately loose: local numbers run 7–10 digits and international ones up
   to 15 (E.164). VenderCRM normalises the format; we only reject what plainly
   cannot be a phone number. */
if (strlen($digits) < 7 || strlen($digits) > 15) {
    respond(false, false, 'phone');
}

$email = field('email', 320);
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, false, 'email');
}

if (rate_limited(client_ip())) {
    respond(false, false, 'rate');
}

// --- 5. First-touch attribution ---------------------------------------------
// Written by the CRM's vc-attribution.js when the CRM script is added; POST fields win.
$attr = [];
if (!empty($_COOKIE['vc_attr'])) {
    $decoded = json_decode((string) $_COOKIE['vc_attr'], true);
    if (is_array($decoded)) {
        $attr = $decoded;
    }
}

$attribution = [];
foreach (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as $key) {
    $value = field($key, 200) ?: (string) ($attr[$key] ?? '');
    if ($value !== '') {
        $attribution[$key] = mb_substr($value, 0, 200);
    }
}

// --- 6. Build the VenderCRM payload -----------------------------------------
// Never send pipeline, stage, owner or tag: routing lives on the site record in
// the CRM so it can be changed without a code deploy.
$formId     = field('form_id', 60) ?: 'contacto';
$sourcePage = field('source_page', 2000) ?: '/';
$need       = field('need', 100);
$company    = field('company', 200);

/* A stable key so a double-click or a network retry replays the same lead
   instead of creating a duplicate. The form supplies one per render; the
   phone-plus-hour fallback covers callers that do not. */
$idempotencyKey = field('idempotency_key', 100);
if (strlen($idempotencyKey) < 8) {
    $idempotencyKey = hash('sha256', $digits . '|' . gmdate('Y-m-d-H'));
}

/* --- The lead value model ---------------
   The page names its service; the tier, the CRM tag and the thank-you copy all
   come from content/lead-values.php. A `service` we do not recognise is
   dropped rather than trusted, and a lead with no service takes the tier of its
   chip — so a posted value_tier can never inflate a lead's worth. */
$service    = field('service', 80);
$toolResult = field('tool_result', 500);

$lead = $service !== '' ? lead_value($service) : lead_value_for_need($need ?: 'otro');
if ($lead['slug'] === null) {
    $service = '';   // unknown slug: keep the lead, drop the claim
}

/* On a /contacto/ lead the chip is what the visitor told us, so the label names
   the need; on a service or tool page it names the page they were reading. */
$serviceLabel = $service !== ''
    ? lead_label($service)
    : ($need !== '' ? lead_need_label($need) : '');

$fields = array_filter([
    'necesita'              => $need !== '' ? lead_need_label($need) : '',
    'empresa'               => $company,
    'formulario'            => $formId,
    'servicio'              => $serviceLabel,
    'valor'                 => (string) $lead['tier'],
    'resultado_herramienta' => $toolResult,
    /* The crmTag travels as a FIELD, not as a top-level `tags` array. The
       VenderCRM endpoint takes no tag/pipeline/stage/owner input by design
       (vendercrm-lead-capture, "Never send pipeline, stage, owner or tag"):
       routing lives on the site record in the CRM so it can change without a
       deploy, and a leaked key cannot redirect leads. Carrying the tag on the
       timeline gives the build plan what it is actually for — knowing what this
       lead is — without handing the browser control of where it lands. */
    'etiqueta'              => (string) $lead['crmTag'],
]);

/* What the JSON path needs to fire the conversion event and show the right
   thank-you. The value is the tier's Ads proxy in
   the site's currency, read from the same file the tier came from. */
$leadResult = [
    'service'    => (string) ($lead['slug'] ?? ''),
    'value_tier' => (string) $lead['tier'],
    'value'      => lead_tier_value((string) $lead['tier']),
    'currency'   => market_currency(),
    'thanks'     => [
        'steps'    => array_values((array) ($lead['nextStep'] ?? [])),
        'whatsapp' => whatsapp_link($lead['whatsappText']),
        'link'     => $lead['nextLink'] ?? null,
    ],
];

$payload = array_filter([
    'phone'           => $phone,
    'name'            => field('name', 200),
    'email'           => $email,
    'message'         => field('message', 5000),
    'source'          => 'formulario-' . $formId,
    'page_url'        => str_starts_with($sourcePage, 'http') ? $sourcePage : url($sourcePage),
    'referrer'        => (string) ($attr['referrer'] ?? ''),
    'idempotency_key' => $idempotencyKey,
], static fn ($v) => $v !== '' && $v !== null);

$payload += $attribution;
if ($fields !== []) {
    $payload['fields'] = $fields;
}

// --- 7. Forward, or degrade gracefully --------------------------------------
$crmUrl = cfg('VENDERCRM_URL');
$apiKey = cfg('VENDERCRM_API_KEY');

if ($crmUrl === null || $apiKey === null || !function_exists('curl_init')) {
    log_lead($payload, 'degraded:not-configured');
    notify_by_email($payload, 'degraded:not-configured');
    respond(true, true, null, $leadResult);
}

$ch = curl_init(rtrim($crmUrl, '/') . '/api/v1/leads');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => LEAD_CRM_TIMEOUT,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'X-Api-Key: ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
]);

$response = curl_exec($ch);
$status   = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

/* 201 created, 200 idempotency replay — both are the system working. */
if ($status === 201 || $status === 200) {
    log_lead($payload, 'crm:' . $status);
    notify_by_email($payload, 'crm:' . $status);
    respond(true, false, null, $leadResult);
}

/* Anything else is our problem, not the visitor's. The body names the failing
   field on a 422 and the misconfiguration on a 401/403, so log all of it. */
error_log(sprintf('VenderCRM lead failed [%d] %s %s', $status, (string) $response, $curlErr));
log_lead($payload, 'degraded:crm-' . ($status ?: 'unreachable'));
notify_by_email($payload, 'degraded:crm-' . ($status ?: 'unreachable'));

respond(true, true, null, $leadResult);
