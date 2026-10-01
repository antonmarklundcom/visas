<?php
/**
 * Renders one service from content/services.php. Every /<slug>/index.php is
 * three lines: require bootstrap, set $slug, require this file.
 *
 * A content phase fills the empty keys in content/services.php and adds CSS
 * below the tokens block; the section order and the markup structure here stay
 * as they are. Each block renders only when its data exists, so the page is
 * coherent from the first seeded record onwards.
 */

declare(strict_types=1);

/** @var string $slug */
$service = services($slug ?? '');

if ($service === null) {
    http_response_code(404);
    require ROOT_DIR . '/404.php';
    return;
}

$clusterLabel = clusters()[$service['cluster']] ?? '';

/* Inicio › Servicios › [Auditoría ›] Title — the audit children sit under their
   sub-hub. */
$breadcrumbs = [['label' => ui('nav.services'), 'path' => services_hub_path()]];
if (!empty($service['parent']) && ($parent = services($service['parent'])) !== null) {
    $breadcrumbs[] = ['label' => $parent['navLabel'], 'path' => $parent['path']];
}
$breadcrumbs[] = ['label' => $service['title'], 'path' => $service['path']];

$page = [
    'title'       => $service['seoTitle'] !== '' ? $service['seoTitle'] : $service['title'],
    'description' => $service['metaDescription'],
    'path'        => $service['path'],
    'breadcrumbs' => $breadcrumbs,
    'faq'         => $service['faq'],
    /* Names this page in the lead value model: the WhatsApp menu,
       the CTA band, the lead form and the thank-you all resolve from it. */
    'leadSlug'    => $slug,
];

$hero        = $service['hero'];
$ctaWhatsapp = whatsapp_text_for_page($page);

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">

  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <p class="eyebrow"><?= e($hero['eyebrow'] !== '' ? $hero['eyebrow'] : $clusterLabel) ?></p>
        <h1><?= e($hero['h1'] !== '' ? $hero['h1'] : $service['title']) ?></h1>
        <?php if ($hero['h2'] !== ''): ?>
          <p class="lead"><?= e($hero['h2']) ?></p>
        <?php endif; ?>
        <?php if ($hero['lead'] !== ''): ?>
          <p class="lead"><?= e($hero['lead']) ?></p>
        <?php elseif ($hero['h2'] === ''): ?>
          <p class="lead"><?= e($service['metaDescription']) ?></p>
        <?php endif; ?>
        <div class="btn-row">
          <a class="btn btn--primary" href="/contacto/">
            <?= e($service['cta']['label'] !== '' ? $service['cta']['label'] : ui('cta.consult')) ?>
          </a>
          <?php if (($wa = whatsapp_link($ctaWhatsapp)) !== null): ?>
            <a class="btn btn--secondary" href="<?= e($wa) ?>" rel="noopener"><?= e(ui('cta.whatsapp')) ?></a>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>

  <?php
    $svcExcludes = $service['excludes'] ?? [];
    $svcWeNeed   = $service['weNeed'] ?? [];
  ?>
  <?php if ($service['includes'] !== [] || $svcExcludes !== [] || $svcWeNeed !== []): ?>
    <section class="section">
      <div class="container">
        <div class="checklist-grid">
          <?php if ($service['includes'] !== []): ?>
            <div>
              <h2><?= e(ui('service.includes')) ?></h2>
              <ul class="checklist mt-4">
                <?php foreach ($service['includes'] as $item): ?>
                  <li><span><?= e($item) ?></span></li>
                <?php endforeach; ?>
              </ul>
            </div>
          <?php endif; ?>
          <?php if ($svcExcludes !== []): ?>
            <div>
              <h2><?= e(ui('service.excludes')) ?></h2>
              <ul class="checklist checklist--no mt-4">
                <?php foreach ($svcExcludes as $item): ?>
                  <li><span><?= e($item) ?></span></li>
                <?php endforeach; ?>
              </ul>
            </div>
          <?php endif; ?>
          <?php if ($svcWeNeed !== []): ?>
            <div>
              <h2><?= e(ui('service.we_need')) ?></h2>
              <ul class="checklist checklist--need mt-4">
                <?php foreach ($svcWeNeed as $item): ?>
                  <li><span><?= e($item) ?></span></li>
                <?php endforeach; ?>
              </ul>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($service['sections'] !== []): ?>
    <section class="section section--surface">
      <div class="container stack">
        <?php foreach ($service['sections'] as $block): ?>
          <div class="prose">
            <h2><?= e($block['h2'] ?? '') ?></h2>
            <?php foreach ($block['body'] ?? [] as $paragraph): ?>
              <p><?= e($paragraph) ?></p>
            <?php endforeach; ?>
            <?php if (!empty($block['items'])): ?>
              <div class="grid grid--2 mt-4">
                <?php foreach ($block['items'] as $item): ?>
                  <div class="card">
                    <h3 class="card-title"><?= e($item['title'] ?? '') ?></h3>
                    <p class="card__text"><?= e($item['text'] ?? '') ?></p>
                  </div>
                <?php endforeach; ?>
              </div>
            <?php endif; ?>
          </div>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($service['benefits'] !== []): ?>
    <section class="section">
      <div class="container">
        <h2><?= e(ui('service.benefits')) ?></h2>
        <div class="grid grid--3 mt-4">
          <?php foreach ($service['benefits'] as $benefit): ?>
            <div class="card">
              <h3 class="card-title"><?= e($benefit['title'] ?? '') ?></h3>
              <p class="card__text"><?= e($benefit['text'] ?? '') ?></p>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <?php $svcToolLinks = $service['toolLinks'] ?? []; ?>
  <?php if ($svcToolLinks !== []): ?>
    <section class="section section--surface">
      <div class="container">
        <?php if (count($svcToolLinks) > 1): ?><div class="grid grid--2"><?php endif; ?>
          <?php foreach ($svcToolLinks as $svcToolLink): ?>
            <a class="card card--link" href="<?= e($svcToolLink['path']) ?>">
              <h2 class="card-title"><?= e($svcToolLink['label'] ?? '') ?></h2>
              <p class="card__text"><?= e($svcToolLink['text'] ?? '') ?></p>
            </a>
          <?php endforeach; ?>
        <?php if (count($svcToolLinks) > 1): ?></div><?php endif; ?>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($service['faq'] !== []): ?>
    <section class="section section--surface">
      <div class="container">
        <?php $faqItems = $service['faq']; ?>
        <?php require ROOT_DIR . '/partials/faq.php'; ?>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($service['related'] !== []): ?>
    <section class="section">
      <div class="container">
        <h2><?= e(ui('service.related')) ?></h2>
        <div class="mt-4">
          <?php $gridSlugs = $service['related']; ?>
          <?php require ROOT_DIR . '/partials/service-card-grid.php'; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <!-- Guía relacionada: additive next to the related-services
       block above — a service with a matching how-to guide links to it. -->
  <?php $svcGuides = $service['guides'] ?? []; ?>
  <?php if ($svcGuides !== []): ?>
    <section class="section section--surface">
      <div class="container">
        <h2><?= e(ui('service.guides')) ?></h2>
        <div class="grid grid--3 mt-4">
          <?php foreach ($svcGuides as $svcGuideSlug): ?>
            <?php $svcGuide = content('guias')[$svcGuideSlug] ?? null; ?>
            <?php if ($svcGuide === null): ?>
              <?php continue; ?>
            <?php endif; ?>
            <a class="card card--link" href="<?= e($svcGuide['path']) ?>">
              <h3 class="card-title"><?= e($svcGuide['navLabel']) ?></h3>
              <p class="card__text"><?= e($svcGuide['metaDescription']) ?></p>
            </a>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <!-- Artículo relacionado: additive next to the guides block
       above — a curated link to the blog article(s) that best cover this
       service's topic, independent of the article's own `service` field. -->
  <?php $svcArticles = $service['articles'] ?? []; ?>
  <?php if ($svcArticles !== []): ?>
    <section class="section">
      <div class="container">
        <h2><?= e(ui('service.articles')) ?></h2>
        <div class="grid grid--3 mt-4">
          <?php foreach ($svcArticles as $svcArticleSlug): ?>
            <?php $svcArticle = null; ?>
            <?php foreach (content('blog') as $svcArticleEntry): ?>
              <?php if ($svcArticleEntry['slug'] === $svcArticleSlug): ?>
                <?php $svcArticle = $svcArticleEntry; ?>
                <?php break; ?>
              <?php endif; ?>
            <?php endforeach; ?>
            <?php if ($svcArticle === null): ?>
              <?php continue; ?>
            <?php endif; ?>
            <a class="card card--link" href="<?= e('/blog/' . $svcArticle['slug'] . '/') ?>">
              <h3 class="card-title"><?= e($svcArticle['title']) ?></h3>
              <p class="card__text"><?= e($svcArticle['description']) ?></p>
            </a>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <!-- Solicitar: the service's own lead form. Every service page
       needs one, because a lead is only worth routing if it arrives carrying
       the service it came from — the CTA band above sends people to WhatsApp,
       this sends the ones who would rather write. -->
  <section class="section section--surface" id="solicitar">
    <div class="container split split--top">
      <div class="stack">
        <p class="eyebrow"><?= e(ui('service.form_eyebrow')) ?></p>
        <h2><?= e($service['cta']['label'] !== '' ? $service['cta']['label'] : ui('form.legend')) ?></h2>
        <p class="lead"><?= e(ui('service.form_lead')) ?></p>
        <ul class="checklist">
          <?php foreach (content('ui')['contact']['steps'] as $svcStep): ?>
            <li><span><?= e($svcStep) ?></span></li>
          <?php endforeach; ?>
        </ul>
      </div>

      <div>
        <?php
        $formId      = $slug;
        $formService = $slug;
        $formNeed    = lead_value($slug)['need'];
        $formHeading = '';
        require ROOT_DIR . '/partials/lead-form.php';
        ?>
      </div>
    </div>
  </section>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
