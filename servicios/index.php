<?php
/**
 * The services hub: every service in content/services.php, grouped by the
 * clusters content/ui.php defines. A service added to that file appears here
 * with no edit to this page.
 */

require __DIR__ . '/../lib/bootstrap.php';

$meta = page_meta(services_hub_path());
$page = [
    'title'       => $meta['title'],
    'description' => $meta['description'],
    'path'        => services_hub_path(),
    'breadcrumbs' => [['label' => ui('nav.services'), 'path' => services_hub_path()]],
];

$hubWhatsapp = whatsapp_link(whatsapp_text_for_page());

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">

  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <p class="eyebrow"><?= e(ui('services_hub.eyebrow')) ?></p>
        <h1><?= e(ui('services_hub.title')) ?></h1>
        <p class="lead"><?= e(ui('services_hub.lead')) ?></p>
      </div>
    </div>
  </section>

  <?php $hubBand = 0; ?>
  <?php foreach (nav('mega') as $hubKey => $hubCluster): ?>
    <?php if ($hubCluster['items'] === []) { continue; } ?>
    <section class="section<?= $hubBand++ % 2 ? ' section--surface' : '' ?>">
      <div class="container">
        <div class="section-head section-head--split">
          <div class="section-head__text">
            <h2><?= e($hubCluster['label']) ?></h2>
          </div>
          <?php $hubLead = content('ui')['cluster_leads'][$hubKey] ?? ''; ?>
          <?php if ($hubLead !== ''): ?>
            <p class="section-head__aside"><?= e($hubLead) ?></p>
          <?php endif; ?>
        </div>

        <div class="mt-4">
          <?php
          $gridSlugs = array_column($hubCluster['items'], 'slug');
          require ROOT_DIR . '/partials/service-card-grid.php';
          ?>
        </div>
      </div>
    </section>
  <?php endforeach; ?>

  <section class="section<?= $hubBand % 2 ? ' section--surface' : '' ?>">
    <div class="container">
      <div class="unsure">
        <div class="unsure__copy">
          <h2 class="card-title"><?= e(ui('services_hub.unsure_title')) ?></h2>
          <p><?= e(ui('services_hub.unsure_text')) ?></p>
        </div>
        <a class="btn btn--primary" href="<?= e($hubWhatsapp ?? '/contacto/') ?>"<?= $hubWhatsapp ? ' rel="noopener"' : '' ?>>
          <?= e(ui('services_hub.unsure_cta')) ?>
        </a>
      </div>
    </div>
  </section>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
