<?php
/**
 * The guides hub: every record in content/guias.php, in file order.
 */

require __DIR__ . '/../lib/bootstrap.php';

$meta = page_meta('/guias/');
$page = [
    'title'       => $meta['title'],
    'description' => $meta['description'],
    'path'        => '/guias/',
    'breadcrumbs' => [['label' => ui('nav.guides'), 'path' => '/guias/']],
];

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">

  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <p class="eyebrow"><?= e(ui('nav.guides')) ?></p>
        <h1><?= e($meta['h1']) ?></h1>
        <p class="lead"><?= e($meta['lead']) ?></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <?php if (content('guias') === []): ?>
        <p class="lead"><?= e(ui('hub.empty')) ?></p>
      <?php else: ?>
        <div class="grid grid--3">
          <?php foreach (content('guias') as $listGuide): ?>
            <a class="card card--link" href="<?= e($listGuide['path']) ?>">
              <h2 class="card-title"><?= e($listGuide['navLabel']) ?></h2>
              <p class="card__text"><?= e($listGuide['metaDescription']) ?></p>
            </a>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </section>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
