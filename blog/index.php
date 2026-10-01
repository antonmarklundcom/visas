<?php
/**
 * The blog listing: every record in content/blog.php, newest first. An article
 * added there appears here, in the sitemap and in the route contract with no
 * edit to this page.
 */

require __DIR__ . '/../lib/bootstrap.php';

$meta = page_meta('/blog/');
$page = [
    'title'       => $meta['title'],
    'description' => $meta['description'],
    'path'        => '/blog/',
    'breadcrumbs' => [['label' => ui('nav.blog'), 'path' => '/blog/']],
];

$articles = content('blog');
usort($articles, static fn (array $a, array $b): int => strcmp($b['date'], $a['date']));

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">

  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <p class="eyebrow"><?= e(ui('nav.blog')) ?></p>
        <h1><?= e($meta['h1']) ?></h1>
        <p class="lead"><?= e($meta['lead']) ?></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <?php if ($articles === []): ?>
        <p class="lead"><?= e(ui('hub.empty')) ?></p>
      <?php else: ?>
        <div class="grid grid--3">
          <?php foreach ($articles as $listArticle): ?>
            <a class="card card--link" href="<?= e('/blog/' . $listArticle['slug'] . '/') ?>">
              <span class="card__meta"><?= e(fmt_date_long($listArticle['date'])) ?></span>
              <h2 class="card-title"><?= e($listArticle['title']) ?></h2>
              <p class="card__text"><?= e($listArticle['description']) ?></p>
            </a>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </section>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
