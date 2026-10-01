<?php
/**
 * The per-service thank-you state — the second touch, and the
 * only piece of copy a visitor reads after they have already committed. So it
 * says what to have ready for the call, not "gracias".
 *
 * Rendered twice for the same lead, from one source: inline inside the form
 * (hidden, revealed by assets/js/lead-form.js) and server-side on
 * /contacto/?enviado=1&s=<slug> for the no-JS path.
 *
 *   $thanksLead    array   a lead_value() / lead_value_for_need() record
 *   $thanksHidden  bool    render with the `hidden` attribute (the JS path)
 *   $thanksAttrs   string  extra attributes for the wrapper, already escaped
 */

declare(strict_types=1);

$thanksLead   = $thanksLead ?? lead_value(null);
$thanksHidden = $thanksHidden ?? false;
$thanksAttrs  = $thanksAttrs ?? '';
$thanksWa     = whatsapp_link($thanksLead['whatsappText']);
$thanksSteps  = (array) ($thanksLead['nextStep'] ?? []);
$thanksLink   = $thanksLead['nextLink'] ?? null;
?>
<div class="thanks" role="status" <?= $thanksAttrs ?><?= $thanksHidden ? ' hidden' : '' ?>>
  <p class="thanks__title"><?= e(ui('form.success_title')) ?></p>

  <?php if ($thanksSteps !== []): ?>
    <p class="thanks__next"><?= e(ui('form.thanks_next')) ?></p>
    <ul class="thanks__steps">
      <?php foreach ($thanksSteps as $thanksStep): ?>
        <li><?= e($thanksStep) ?></li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>

  <div class="thanks__actions">
    <?php if ($thanksWa !== null): ?>
      <a class="btn btn--whatsapp" href="<?= e($thanksWa) ?>" rel="noopener"
         data-service="<?= e((string) ($thanksLead['slug'] ?? '')) ?>">
        <?= e(ui('cta.whatsapp_long')) ?>
      </a>
    <?php endif; ?>
    <?php if (is_array($thanksLink) && !empty($thanksLink['path'])): ?>
      <a class="btn btn--secondary" href="<?= e($thanksLink['path']) ?>">
        <?= e($thanksLink['label'] ?? '') ?>
      </a>
    <?php endif; ?>
  </div>
</div>
<?php
unset($thanksLead, $thanksHidden, $thanksAttrs, $thanksWa, $thanksSteps, $thanksLink, $thanksStep);
