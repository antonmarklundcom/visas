<?php
/**
 * The closing "solicitar consulta" band. Reused at the foot of every service
 * page, tool, article and hub.
 *
 *   $ctaTitle     string  defaults to ui('cta_band.title')
 *   $ctaLead      string  defaults to ui('cta_band.lead')
 *   $ctaWhatsapp  string  wa.me prefill text; defaults to this page's own text
 *                         from content/lead-values.php, so the
 *                         message names the service the visitor was reading
 *                         about and never the button's label
 *   $ctaContactPath string  the primary button's href, defaults to /contacto/
 *                           (a second-language section passes its own path)
 */

declare(strict_types=1);

$ctaTitle       = $ctaTitle ?? ui('cta_band.title');
$ctaLead        = $ctaLead ?? ui('cta_band.lead');
$ctaWhatsapp    = $ctaWhatsapp ?? whatsapp_text_for_page();
$ctaSlug        = current_lead_slug();
$ctaLink        = whatsapp_link($ctaWhatsapp);
$ctaContactPath = $ctaContactPath ?? '/contacto/';
?>
<section class="section section--ink">
  <div class="container stack">
    <p class="eyebrow"><?= e(ui('cta_band.eyebrow')) ?></p>
    <h2 class="d2"><?= e($ctaTitle) ?></h2>
    <p class="lead"><?= e($ctaLead) ?></p>
    <div class="btn-row">
      <a class="btn btn--primary" href="<?= e($ctaContactPath) ?>"><?= e(ui('cta.consult')) ?></a>
      <?php if ($ctaLink !== null): ?>
        <a class="btn btn--whatsapp" href="<?= e($ctaLink) ?>" rel="noopener"
           data-service="<?= e($ctaSlug ?? '') ?>"><?= e(ui('cta.whatsapp_long')) ?></a>
      <?php endif; ?>
    </div>
  </div>
</section>
<?php
/* An include shares the caller's scope: leave nothing behind for a second band
   or a later partial on the same page (house convention). */
unset($ctaTitle, $ctaLead, $ctaWhatsapp, $ctaSlug, $ctaLink, $ctaContactPath);
