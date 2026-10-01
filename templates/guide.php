<?php
/**
 * Renders one guide from content/guias.php. Every /guias/<slug>/index.php is
 * three lines: require bootstrap, set $slug, require this file — the same
 * discipline templates/service.php and templates/tool.php use.
 *
 * A guide has no calculator, so unlike templates/tool.php there is nothing to
 * output-buffer per page: the shared chrome here (breadcrumbs, hero, numbered
 * steps, delegate box, FAQ, related guides, CTA) is the whole page, built
 * straight from content/guias.php the way templates/service.php builds a
 * service page straight from content/services.php.
 *
 *   $slug  string  required — looked up in content('guias')
 */

declare(strict_types=1);

/** @var string $slug */
$guide = content('guias')[$slug ?? ''] ?? null;

if ($guide === null) {
    http_response_code(404);
    require ROOT_DIR . '/404.php';
    return;
}

/* The "Cuándo conviene delegarlo" box and every WhatsApp/CTA on this page
   resolve through the guide's relatedService slug — the one place the model
   is named, so the box, the form and the page's own lead_value() all agree. */
$delegateSlug = $guide['relatedService'] ?? null;
$delegateLead = lead_value($delegateSlug);

/* HowTo JSON-LD from the same $guide['steps'] array that renders the visible
   numbered list — one source, by design */
$howToSteps = [];
foreach ($guide['steps'] as $i => $guideStep) {
    $howToSteps[] = [
        '@type'    => 'HowToStep',
        'position' => $i + 1,
        'name'     => $guideStep['title'],
        'text'     => implode(' ', $guideStep['body']),
    ];
}
$howTo = [
    '@context'    => 'https://schema.org',
    '@type'       => 'HowTo',
    'name'        => $guide['hero']['h1'],
    'description' => $guide['metaDescription'],
    'step'        => $howToSteps,
];

$page = [
    'title'       => $guide['seoTitle'] !== '' ? $guide['seoTitle'] : $guide['title'],
    'description' => $guide['metaDescription'],
    'path'        => $guide['path'],
    'breadcrumbs' => [
        ['label' => ui('nav.guides'), 'path' => '/guias/'],
        ['label' => $guide['title'], 'path' => $guide['path']],
    ],
    'faq'      => $guide['faq'],
    'leadSlug' => $delegateSlug,
    'jsonld'   => [$howTo],
];

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">

  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <p class="eyebrow"><?= e($guide['hero']['eyebrow']) ?></p>
        <h1><?= e($guide['hero']['h1']) ?></h1>
        <p class="lead"><?= e($guide['hero']['lead']) ?></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container stack">
      <p class="note guide-reviewed">
        <?= e(ui('guide.reviewed_prefix')) ?>
        <?= e($guide['lastReviewed']) ?>. <?= e(ui('guide.orientativo')) ?>
      </p>

      <?php if ($guide['intro'] !== []): ?>
        <div class="prose">
          <?php foreach ($guide['intro'] as $guideParagraph): ?>
            <p><?= e($guideParagraph) ?></p>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>

      <?php if ($guide['steps'] !== []): ?>
        <ol class="steps mt-4">
          <?php foreach ($guide['steps'] as $guideStep): ?>
            <li class="steps__item">
              <h2><?= e($guideStep['title']) ?></h2>
              <?php foreach ($guideStep['body'] as $guideStepParagraph): ?>
                <p><?= e($guideStepParagraph) ?></p>
              <?php endforeach; ?>
            </li>
          <?php endforeach; ?>
        </ol>
      <?php endif; ?>
    </div>
  </section>

  <?php if ($guide['toolLink'] !== null): ?>
    <section class="section section--surface">
      <div class="container">
        <a class="card card--link" href="<?= e($guide['toolLink']['path']) ?>">
          <h2 class="card-title"><?= e($guide['toolLink']['label']) ?></h2>
          <p class="card__text"><?= e($guide['toolLink']['text']) ?></p>
        </a>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($guide['faq'] !== []): ?>
    <section class="section">
      <div class="container">
        <?php $faqItems = $guide['faq']; ?>
        <?php require ROOT_DIR . '/partials/faq.php'; ?>
      </div>
    </section>
  <?php endif; ?>

  <!-- Cuándo conviene delegarlo: the guide's own lead form, set
       to the matching service via content/lead-values.php — never a bare
       link, per prompts/sonnet-5-guias.md. -->
  <?php if ($delegateSlug !== null): ?>
    <section class="section section--surface" id="delegar">
      <div class="container split split--top">
        <div class="stack">
          <p class="eyebrow"><?= e(ui('guide.delegate_eyebrow')) ?></p>
          <h2><?= e(ui('guide.delegate_title')) ?></h2>
          <p class="lead"><?= e(ui('guide.delegate_lead')) ?></p>
          <ul class="checklist">
            <?php foreach ($delegateLead['nextStep'] as $guideNextStep): ?>
              <li><span><?= e($guideNextStep) ?></span></li>
            <?php endforeach; ?>
          </ul>
        </div>

        <div>
          <?php
          $formId      = 'guia-' . $slug;
          $formService = $delegateSlug;
          $formNeed    = $delegateLead['need'];
          $formHeading = ui('guide.delegate_form_heading');
          require ROOT_DIR . '/partials/lead-form.php';
          ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <?php
    $guideRelated = [];
    foreach ($guide['related'] as $guideRelatedSlug) {
        if (isset(content('guias')[$guideRelatedSlug])) {
            $guideRelated[] = content('guias')[$guideRelatedSlug];
        }
    }
  ?>
  <?php if ($guideRelated !== []): ?>
    <section class="section">
      <div class="container">
        <h2><?= e(ui('guide.related')) ?></h2>
        <div class="grid grid--3 mt-4">
          <?php foreach ($guideRelated as $oneGuide): ?>
            <a class="card card--link" href="<?= e($oneGuide['path']) ?>">
              <h3 class="card-title"><?= e($oneGuide['navLabel']) ?></h3>
              <p class="card__text"><?= e($oneGuide['metaDescription']) ?></p>
            </a>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
