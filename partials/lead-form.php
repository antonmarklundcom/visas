<?php
/**
 * The lead form. Posts to /enviar.php, which forwards to VenderCRM.
 *
 * Progressive enhancement: this is an ordinary form. Without JS
 * it does a normal POST and enviar.php redirects to
 * /contacto/?enviado=1&s=<slug>, which renders the same per-service thank-you
 * this form shows inline when JS is available.
 *
 * The "¿Qué necesita?" chips  are real radio inputs behind styled
 * labels, so the selection survives with JS disabled.
 *
 * Optional variables a caller may set before requiring this partial:
 *   $formId          string  distinguishes this form in the CRM 'source' field
 *   $formNeed        string  pre-selected need key (a quiz or tool page uses this)
 *   $formHeading     string  visible heading, omitted when empty
 *   $formService     string  service or tool slug this form belongs to.
 *                            Defaults to the page's own slug, so a service page
 *                            needs to set nothing
 *   $formToolResult  string  what the visitor computed, <= 500 chars
 *   $formSourcePage  string  path to report as source_page. Only tools need it:
 *                            they render the form into a buffer BEFORE
 *                            templates/tool.php sets $page
 *
 * Named $form* rather than $service/$toolResult on purpose: an include shares
 * the caller's scope, and a bare $service here would shadow the service record
 * in templates/service.php — a bug this codebase has actually hit.
 *
 * This file is shared chrome: pages parameterise it, they do not edit it.
 */

declare(strict_types=1);

$formId      = $formId ?? 'contacto';
$formNeed    = $formNeed ?? '';
$formHeading = $formHeading ?? ui('form.legend');

/* The lead value model decides this form's service, tier and thank-you copy. A form on a service or tool page inherits the page's slug; a
   form on /contacto/ or the homepage has none, and takes the tier of whichever
   chip the visitor picks — enviar.php resolves that server-side, and
   assets/js/lead-form.js reads it from the chip's data-tier for the event. */
$formService = $formService ?? (current_lead_slug() ?? '');
$formLead    = $formService !== '' ? lead_value($formService) : lead_value_for_need($formNeed ?: 'otro');
$formTier    = (string) $formLead['tier'];

$formToolResult = mb_substr((string) ($formToolResult ?? ''), 0, 500);
$sourcePage     = $formSourcePage ?? ($page['path'] ?? '/');

$whatsapp = whatsapp_link($formLead['whatsappText']);

/* One key per rendered form: a double-click or a retry replays it and VenderCRM
   returns the original lead instead of creating a duplicate. */
$idempotencyKey = bin2hex(random_bytes(16));

$utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
?>
<form class="lead-form" action="/enviar.php" method="post" data-lead-form
      data-whatsapp="<?= e($whatsapp ?? '') ?>">

  <?php if ($formHeading !== ''): ?>
    <h2 class="card-title"><?= e($formHeading) ?></h2>
  <?php endif; ?>

  <div class="lead-form__row">
    <label class="field">
      <span><?= e(ui('form.name')) ?></span>
      <input type="text" name="name" autocomplete="name" required>
    </label>
    <label class="field">
      <span><?= e(ui('form.company')) ?></span>
      <input type="text" name="company" autocomplete="organization">
    </label>
  </div>

  <div class="lead-form__row">
    <label class="field">
      <span><?= e(ui('form.phone')) ?></span>
      <input type="tel" name="phone" inputmode="tel" autocomplete="tel"
             placeholder="<?= e(ui('form.phone_hint')) ?>" required>
    </label>
    <label class="field">
      <span><?= e(ui('form.email')) ?></span>
      <input type="email" name="email" autocomplete="email">
    </label>
  </div>

  <fieldset class="field">
    <legend><?= e(ui('form.need')) ?></legend>
    <div class="chip-row">
      <?php foreach (content('ui')['needs'] as $key => $label): ?>
        <input class="chip-radio" type="radio" name="need"
               id="need-<?= e($formId . '-' . $key) ?>" value="<?= e($key) ?>"
               data-tier="<?= e(lead_value_for_need($key)['tier']) ?>"
               <?= $formNeed === $key ? 'checked' : '' ?>>
        <label class="chip" for="need-<?= e($formId . '-' . $key) ?>"><?= e($label) ?></label>
      <?php endforeach; ?>
    </div>
  </fieldset>

  <label class="field">
    <span><?= e(ui('form.message')) ?></span>
    <textarea name="message" rows="3" placeholder="<?= e(ui('form.message_hint')) ?>"></textarea>
  </label>

  <!-- Honeypot: bots fill it, humans never see it. -->
  <div class="honeypot" aria-hidden="true">
    <label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label>
  </div>

  <input type="hidden" name="form_id" value="<?= e($formId) ?>">
  <input type="hidden" name="source_page" value="<?= e($sourcePage) ?>">
  <input type="hidden" name="idempotency_key" value="<?= e($idempotencyKey) ?>">
  <!-- The lead value routing fields. enviar.php re-derives the
       tier from `service`/`need` rather than trusting value_tier: tier is set
       by the page, never by whoever posts the form. -->
  <input type="hidden" name="service" value="<?= e($formService) ?>">
  <input type="hidden" name="value_tier" value="<?= e($formTier) ?>">
  <!-- Always rendered, usually empty: a calculator fills it in through
       assets/js/tools/tools-shared.js when the visitor uses its result. -->
  <input type="hidden" name="tool_result" value="<?= e($formToolResult) ?>" data-tool-result>
  <?php foreach ($utmKeys as $key): ?>
    <?php if (!empty($_GET[$key]) && is_string($_GET[$key])): ?>
      <input type="hidden" name="<?= e($key) ?>" value="<?= e(substr($_GET[$key], 0, 200)) ?>">
    <?php endif; ?>
  <?php endforeach; ?>

  <button class="btn btn--primary" type="submit" data-submit
          data-sending="<?= e(ui('form.sending')) ?>"><?= e(ui('form.submit')) ?></button>

  <p class="note">
    <?= e(ui('form.privacy_note')) ?>
    <a href="/privacidad/"><?= e(ui('nav.privacy')) ?></a>.
  </p>

  <?php
    /* The inline success state is the same per-service thank-you the no-JS
       redirect renders on /contacto/, from the same record — one copy of the
       text, two ways in. */
    $thanksLead   = $formLead;
    $thanksHidden = true;
    $thanksAttrs  = 'data-form-ok tabindex="-1"';
    require ROOT_DIR . '/partials/lead-thanks.php';
  ?>

  <p class="form-status form-status--error" data-form-error hidden role="alert">
    <strong><?= e(ui('form.error_title')) ?></strong>
    <?= e(ui('form.error_text')) ?>
  </p>
</form>
<?php
/* An include shares the caller's scope: a second form on the same page must
   not inherit the first one's service, need or heading (house convention). */
unset(
    $formId, $formNeed, $formHeading, $formService, $formLead, $formTier,
    $formToolResult, $formSourcePage, $sourcePage, $whatsapp, $idempotencyKey,
    $utmKeys, $key, $label
);
