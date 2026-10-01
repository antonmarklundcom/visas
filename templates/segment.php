<?php
/**
 * Renders one segment page from content/segmentos.php: a landing page per rubro
 * (sector) or per situation — "servicios para importadores", "byta
 * leverantör". Every route file is three lines: require bootstrap, set $slug,
 * require this file — the same pattern templates/service.php and
 * templates/tool.php use.
 *
 * A segment page has no tier or WhatsApp message of its own: it presets the
 * visitor into $record['leadSlug'], an existing service slug in
 * content/lead-values.php['services'], so the whole lead value model
 * resolves the tier, the CRM tag and the WhatsApp prefill with no new
 * entries needed there.
 *
 * New file, additive — not one of the hard-limited templates.
 */

declare(strict_types=1);

/** @var string $slug */
$record = content('segmentos')[$slug ?? ''] ?? null;

if ($record === null) {
    http_response_code(404);
    require ROOT_DIR . '/404.php';
    return;
}

$page = [
    'title'       => $record['seoTitle'],
    'description' => $record['metaDescription'],
    'path'        => $record['path'],
    'breadcrumbs' => [
        ['label' => ui('nav.services'), 'path' => services_hub_path()],
        ['label' => $record['seoTitle'], 'path' => $record['path']],
    ],
    'faq'      => $record['faq'],
    /* Every WhatsApp link and the CTA band on this page resolve through the
       bundle's tier-A service, not a segmento entry of its own. */
    'leadSlug' => $record['leadSlug'],
];

$hero        = $record['hero'];
$ctaWhatsapp = whatsapp_text_for_page($page);

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">

  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <p class="eyebrow"><?= e($hero['eyebrow']) ?></p>
        <h1><?= e($hero['h1']) ?></h1>
        <p class="lead"><?= e($hero['lead']) ?></p>
        <div class="btn-row">
          <a class="btn btn--primary" href="#solicitar"><?= e(ui('cta.consult')) ?></a>
          <?php if (($wa = whatsapp_link($ctaWhatsapp)) !== null): ?>
            <a class="btn btn--secondary" href="<?= e($wa) ?>" rel="noopener"><?= e(ui('cta.whatsapp')) ?></a>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>

  <?php $segBand = 0; /* alternates white/surface across whichever of the
                          optional bands below actually render */ ?>

  <?php if ($record['traps'] !== []): ?>
    <section class="section<?= $segBand++ % 2 ? ' section--surface' : '' ?>">
      <div class="container">
        <h2><?= e(ui('segment.traps_title')) ?></h2>
        <div class="grid grid--3 mt-4">
          <?php foreach ($record['traps'] as $trap): ?>
            <div class="card">
              <h3 class="card-title"><?= e($trap['title'] ?? '') ?></h3>
              <p class="card__text"><?= e($trap['text'] ?? '') ?></p>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($record['sections'] !== []): ?>
    <section class="section<?= $segBand++ % 2 ? ' section--surface' : '' ?>">
      <div class="container stack">
        <?php foreach ($record['sections'] as $block): ?>
          <div class="prose">
            <h2><?= e($block['h2'] ?? '') ?></h2>
            <?php foreach ($block['body'] ?? [] as $paragraph): ?>
              <p><?= e($paragraph) ?></p>
            <?php endforeach; ?>
          </div>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($record['bundle'] !== []): ?>
    <section class="section<?= $segBand++ % 2 ? ' section--surface' : '' ?>">
      <div class="container">
        <h2><?= e(ui('segment.bundle_title')) ?></h2>
        <div class="mt-4">
          <?php $gridSlugs = $record['bundle']; ?>
          <?php require ROOT_DIR . '/partials/service-card-grid.php'; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($record['weNeed'] !== []): ?>
    <section class="section<?= $segBand++ % 2 ? ' section--surface' : '' ?>">
      <div class="container">
        <h2><?= e(ui('service.we_need')) ?></h2>
        <ul class="checklist checklist--need mt-4">
          <?php foreach ($record['weNeed'] as $item): ?>
            <li><span><?= e($item) ?></span></li>
          <?php endforeach; ?>
        </ul>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($record['faq'] !== []): ?>
    <section class="section<?= $segBand++ % 2 ? ' section--surface' : '' ?>">
      <div class="container">
        <?php $faqItems = $record['faq']; ?>
        <?php require ROOT_DIR . '/partials/faq.php'; ?>
      </div>
    </section>
  <?php endif; ?>

  <!-- Solicitar: preset to the bundle's tier-A service. -->
  <section class="section<?= $segBand % 2 ? '' : ' section--surface' ?>" id="solicitar">
    <div class="container split split--top">
      <div class="stack">
        <p class="eyebrow"><?= e(ui('segment.form_eyebrow')) ?></p>
        <h2><?= e(ui('form.legend')) ?></h2>
        <p class="lead"><?= e(ui('segment.form_lead')) ?></p>
      </div>

      <div>
        <?php
        $formId      = 'segmento-' . $slug;
        $formService = $record['leadSlug'];
        $formHeading = '';
        require ROOT_DIR . '/partials/lead-form.php';
        ?>
      </div>
    </div>
  </section>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
