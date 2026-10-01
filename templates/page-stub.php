<?php
/**
 * Placeholder page for a route that exists but whose content belongs to a later
 * phase. Renders the page's real H1 and lead from
 * content/pages.php, says plainly that the page is being prepared, and offers
 * the conversion path so the route is never a dead end.
 *
 * Stub pages are noindex and stay out of sitemap.php, so an unfinished page can
 * never be indexed. The phase that writes the page replaces this file's use by
 * setting 'stub' => false in content/pages.php and building the page properly.
 *
 * Expects $page to be set by the caller.
 */

declare(strict_types=1);

$meta = page_meta($page['path']);

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">
  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <h1><?= e($meta['h1'] ?? '') ?></h1>
        <?php if (!empty($meta['lead'])): ?>
          <p class="lead"><?= e($meta['lead']) ?></p>
        <?php endif; ?>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container stack">
      <p class="lead"><?= e(ui('placeholder.notice')) ?> <?= e(ui('placeholder.action')) ?></p>
      <div class="btn-row">
        <a class="btn btn--primary" href="/contacto/"><?= e(ui('cta.consult')) ?></a>
        <a class="btn btn--secondary" href="<?= e(services_hub_path()) ?>"><?= e(ui('nav.all_services')) ?></a>
      </div>
    </div>
  </section>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
