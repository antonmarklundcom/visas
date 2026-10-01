<?php
/**
 * Escaping, URL and formatting helpers. Every value that reaches the page goes
 * through e().
 */

declare(strict_types=1);

/**
 * Escape for HTML text and attribute context.
 */
function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * The site origin without a trailing slash. Falls back to the current request
 * host so local preview and the staging subdomain work with no config.php.
 */
function site_origin(): string
{
    $configured = cfg('SITE_URL');
    if ($configured !== null) {
        return rtrim($configured, '/');
    }

    $https  = ($_SERVER['HTTPS'] ?? '') === 'on' || ($_SERVER['SERVER_PORT'] ?? '') === '443';
    $host   = $_SERVER['HTTP_HOST'] ?? (string) site('domain');

    return ($https ? 'https://' : 'http://') . $host;
}

/**
 * Absolute URL for a site-root-relative path. Used for canonical, OG and the
 * sitemap; in-page links use the bare path.
 */
function url(string $path = '/'): string
{
    return site_origin() . '/' . ltrim($path, '/');
}

/**
 * Asset path with a cache-busting stamp taken from the file's mtime, so a
 * changed CSS or JS file is picked up without touching the filename.
 */
function asset(string $path): string
{
    $path = '/' . ltrim($path, '/');
    $file = ROOT_DIR . $path;

    return is_file($file) ? $path . '?v=' . filemtime($file) : $path;
}

/**
 * Business facts from content/site.php. A value the owner has not supplied yet
 * is null, and every partial hides rather than inventing one.
 */
function site(?string $key = null)
{
    $site = content('site');

    return $key === null ? $site : ($site[$key] ?? null);
}

/**
 * A UI string from content/ui.php — every visible label on the site lives
 * there, so a new site translates it once. Dot notation reaches into nested
 * groups: ui('form.submit').
 *
 * A second language is an additive file (content/ui.<lang>.php) plus a page
 * that selects it; nothing in this function has to change to allow that.
 */
function ui(string $key, string $default = ''): string
{
    $value = content('ui');
    foreach (explode('.', $key) as $segment) {
        if (!is_array($value) || !array_key_exists($segment, $value)) {
            return $default;
        }
        $value = $value[$segment];
    }

    return is_string($value) ? $value : $default;
}

/**
 * All services keyed by slug, or one service record.
 */
function services(?string $slug = null): ?array
{
    $services = content('services');

    return $slug === null ? $services : ($services[$slug] ?? null);
}

/**
 * Path of the services hub — '/servicios/' unless content/site.php sets
 * 'servicesHub' (e.g. '/productos/' for a store). The hub's route directory
 * must match: move servicios/index.php to the new path.
 */
function services_hub_path(): string
{
    $hub = site('servicesHub');

    return is_string($hub) && $hub !== '' ? $hub : '/servicios/';
}

/**
 * A static page record from content/pages.php, keyed by path.
 */
function page_meta(string $path): array
{
    return content('pages')[$path] ?? [];
}

/**
 * Cluster labels keyed by cluster id, in menu order.
 */
function clusters(): array
{
    return content('ui')['clusters'];
}

/**
 * The header/footer link trees from content/nav.php.
 */
function nav(?string $key = null)
{
    $nav = content('nav');

    return $key === null ? $nav : ($nav[$key] ?? []);
}

/**
 * Digits-only phone, suitable for wa.me and tel:.
 */
function phone_digits(?string $phone): string
{
    return preg_replace('/\D+/', '', (string) $phone) ?? '';
}

/**
 * wa.me deep link with a prefilled message, or null when no WhatsApp number is
 * configured yet. Callers fall back to /contacto/.
 */
function whatsapp_link(?string $text = null): ?string
{
    $number = phone_digits(site('whatsapp'));
    if ($number === '') {
        return null;
    }

    $link = 'https://wa.me/' . $number;
    if ($text !== null && $text !== '') {
        $link .= '?text=' . rawurlencode($text);
    }

    return $link;
}

/**
 * Where the primary "contact us" action points: WhatsApp when a number exists,
 * the contact page until then.
 */
function contact_link(?string $text = null): string
{
    return whatsapp_link($text) ?? '/contacto/';
}

/**
 * True when $path is the page currently being rendered — used for aria-current
 * in the nav.
 */
function is_current(string $path, string $currentPath): bool
{
    return rtrim($path, '/') === rtrim($currentPath, '/');
}

/* ------------------------------------------------------------------ leads --
   The lead value model. content/lead-values.php is the single source for tiers,
   Ads conversion values, WhatsApp prefills and thank-you text; nothing below
   hardcodes any of them. */

/**
 * One resolved lead-value record for a service or tool slug, or the neutral
 * default when the slug is unknown (an article, a legal page, /nosotros/).
 *
 * Service and tool slugs share one namespace here — they do not collide, and a
 * caller that only knows "the page's slug" should not have to know which kind
 * of page it is looking at.
 */
function lead_value(?string $slug = null): array
{
    $model = content('lead-values');

    $record = $model['services'][$slug ?? ''] ?? $model['tools'][$slug ?? ''] ?? null;
    if ($record === null) {
        return $model['default'] + ['slug' => null];
    }

    return $record + ['slug' => $slug];
}

/**
 * The record a "¿Qué necesita?" chip maps to: a /contacto/ or homepage lead has
 * no service page behind it, so it takes the tier of its chip and borrows that
 * chip's service copy.
 */
function lead_value_for_need(string $need): array
{
    $model = content('lead-values');
    $chip  = $model['needs'][$need] ?? null;

    if ($chip === null) {
        return lead_value(null);
    }

    $record = $chip['service'] !== null ? lead_value($chip['service']) : $model['default'] + ['slug' => null];

    /* The chip's own tier and tag win — the chip is what the visitor told us. */
    return ['tier' => $chip['tier'], 'crmTag' => $chip['crmTag'], 'need' => $need] + $record;
}

/**
 * The Google Ads conversion value for a tier, in guaraníes. An optimisation
 * proxy, not a revenue estimate.
 */
function lead_tier_value(string $tier): int
{
    return (int) (content('lead-values')['tierValues'][$tier] ?? 0);
}

/**
 * The human label for a `need` key: a form chip first, then the extra labels in
 * content/lead-values.php for needs with no chip of their own.
 */
function lead_need_label(string $need): string
{
    return ui('needs.' . $need)
        ?: (string) (content('lead-values')['needLabels'][$need] ?? $need);
}

/**
 * The lead source slug of the page being rendered, or null when it has none.
 *
 * A page may name itself with $page['leadSlug'] (templates/service.php,
 * templates/tool.php and templates/article.php do); otherwise its path is
 * matched against the service and tool records, so a route joins the model by
 * existing rather than by being registered twice.
 */
function current_lead_slug(?array $page = null): ?string
{
    $page = $page ?? ($GLOBALS['page'] ?? []);

    if (!empty($page['leadSlug'])) {
        return (string) $page['leadSlug'];
    }

    $path = rtrim((string) ($page['path'] ?? ''), '/');
    if ($path === '') {
        return null;
    }

    foreach ([services(), content('tools')] as $records) {
        foreach ($records as $slug => $record) {
            if (rtrim((string) ($record['path'] ?? ''), '/') === $path) {
                return (string) $slug;
            }
        }
    }

    return null;
}

/**
 * The wa.me prefill for the page being rendered . EVERY WhatsApp
 * link on the site goes through this — header pill, floating button, mobile
 * bar, homepage, hub, CTA band, tool CTAs — so a message always names the
 * service the visitor was reading about and never the button's own label.
 */
function whatsapp_text_for_page(?array $page = null): string
{
    return (string) lead_value(current_lead_slug($page))['whatsappText'];
}

/**
 * The WhatsApp menu options : the current page's service first
 * and pre-highlighted, then the priority services, then the "other" option.
 * Duplicates are dropped, so the current page's service is listed once.
 *
 * Each entry: slug, label, text (the prefill), link (wa.me or null), current.
 */
function whatsapp_menu(?array $page = null): array
{
    $model   = content('lead-values');
    $current = current_lead_slug($page);
    $slugs   = array_values(array_unique(array_filter(
        array_merge([$current], $model['whatsappMenu'])
    )));

    $options = [];
    foreach ($slugs as $slug) {
        $record = lead_value($slug);
        if ($record['slug'] === null) {
            continue;   // a page that named a slug the model does not know
        }
        $options[] = [
            'slug'    => $slug,
            'label'   => lead_label($slug),
            'text'    => $record['whatsappText'],
            'link'    => whatsapp_link($record['whatsappText']),
            'current' => $slug === $current,
        ];
    }

    /* "Otra consulta" always closes the menu: the visitor who wants none of the
       above still gets a message that says something. */
    $options[] = [
        'slug'    => '',
        'label'   => ui('whatsapp.other'),
        'text'    => $model['default']['whatsappText'],
        'link'    => whatsapp_link($model['default']['whatsappText']),
        'current' => false,
    ];

    return $options;
}

/**
 * The short human name a source goes by — in the WhatsApp menu and in the CRM's
 * `servicio` field. content/lead-values.php owns it, because a page title is
 * often frozen for SEO and too terse to read as a menu option; a service
 * without a menuLabel falls back to its navLabel.
 */
function lead_label(string $slug): string
{
    $record = lead_value($slug);
    if (!empty($record['menuLabel'])) {
        return (string) $record['menuLabel'];
    }

    $page = services($slug) ?? content('tools')[$slug] ?? null;

    return (string) ($page['navLabel'] ?? $page['title'] ?? $slug);
}
