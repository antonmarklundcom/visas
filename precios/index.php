<?php
/**
 * Pricing: the plans in content/precios.php. A plan whose 'price' is null shows
 * its scope and a quotation CTA instead of a figure — never a placeholder
 * number.
 */

require __DIR__ . '/../lib/bootstrap.php';

$meta = page_meta('/precios/');
$page = [
    'title'       => $meta['title'],
    'description' => $meta['description'],
    'path'        => '/precios/',
    'breadcrumbs' => [['label' => ui('nav.pricing'), 'path' => '/precios/']],
];

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">

  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <p class="eyebrow"><?= e(ui('nav.pricing')) ?></p>
        <h1><?= e($meta['h1']) ?></h1>
        <p class="lead"><?= e($meta['lead']) ?></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid grid--3">
        <?php foreach (content('precios') as $plan): ?>
          <article class="card<?= !empty($plan['featured']) ? ' card--service' : '' ?>">
            <h2 class="card-title"><?= e($plan['name']) ?></h2>
            <p class="card__text"><?= e($plan['audience']) ?></p>
            <p class="price">
              <?php if (!empty($plan['price'])): ?>
                <strong><?= e(fmt_money((int) $plan['price'])) ?></strong>
                <span class="note"><?= e(ui('pricing.per_month')) ?></span>
              <?php else: ?>
                <strong><?= e(ui('pricing.quote')) ?></strong>
              <?php endif; ?>
            </p>
            <ul class="checklist mt-4">
              <?php foreach ($plan['includes'] as $planLine): ?>
                <li><span><?= e($planLine) ?></span></li>
              <?php endforeach; ?>
            </ul>
            <p class="mt-4"><a class="btn btn--primary" href="/contacto/"><?= e(ui('pricing.cta')) ?></a></p>
          </article>
        <?php endforeach; ?>
      </div>

      <p class="note mt-4"><?= e(ui('pricing.note')) ?></p>
    </div>
  </section>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
