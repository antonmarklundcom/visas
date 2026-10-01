<?php
/**
 * 404 page. Reached through the ErrorDocument directive in .htaccess (and the
 * equivalent branch in router.php), so it is also included directly by
 * templates/service.php for an unknown slug — hence the guard on ROOT_DIR.
 */

if (!defined('ROOT_DIR')) {
    require __DIR__ . '/lib/bootstrap.php';
}

if (!headers_sent()) {
    http_response_code(404);
}

$meta = page_meta('/404');
$page = [
    'title'       => $meta['title'] ?? '',
    'description' => $meta['description'] ?? '',
    'path'        => '/404',
    'noindex'     => true,
];

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">
  <section class="page-hero">
    <div class="container">
      <div class="page-hero__inner">
        <h1><?= e(ui('error404.title')) ?></h1>
        <p class="lead"><?= e(ui('error404.lead')) ?></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <?php
      /* The first few services, whatever they are on this site. */
      $gridSlugs    = array_slice(array_keys(services()), 0, 6);
      $gridNumbered = false;
      require ROOT_DIR . '/partials/service-card-grid.php';
      ?>
      <p class="mt-4"><a href="<?= e(services_hub_path()) ?>"><?= e(ui('nav.all_services')) ?> →</a></p>
    </div>
  </section>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
