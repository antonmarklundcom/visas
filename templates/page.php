<?php
/**
 * A plain content page from content/pages.php: the H1 and lead from the page
 * record, then its optional 'sections' as prose, then the CTA band. Used by the
 * legal pages and by any page whose whole content is text.
 *
 * Every route file that uses it is three lines: require bootstrap, set $path,
 * require this file.
 *
 *   $path  string  required — the key in content/pages.php
 *
 * A page whose record has 'stub' => true renders through
 * templates/page-stub.php instead; the route file decides which.
 */

declare(strict_types=1);

/** @var string $path */
$meta = page_meta($path ?? '/');

if ($meta === []) {
    http_response_code(404);
    require ROOT_DIR . '/404.php';
    return;
}

$page = [
    'title'       => $meta['title'],
    'description' => $meta['description'],
    'path'        => $path,
    'breadcrumbs' => [['label' => $meta['title'], 'path' => $path]],
];

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">
  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <h1><?= e($meta['h1'] !== '' ? $meta['h1'] : $meta['title']) ?></h1>
        <?php if (!empty($meta['lead'])): ?>
          <p class="lead"><?= e($meta['lead']) ?></p>
        <?php endif; ?>
      </div>
    </div>
  </section>

  <?php if (!empty($meta['sections'])): ?>
    <section class="section">
      <div class="container stack">
        <?php foreach ($meta['sections'] as $pageBlock): ?>
          <div class="prose">
            <?php if (!empty($pageBlock['h2'])): ?>
              <h2><?= e($pageBlock['h2']) ?></h2>
            <?php endif; ?>
            <?php foreach ($pageBlock['body'] ?? [] as $pageParagraph): ?>
              <p><?= e($pageParagraph) ?></p>
            <?php endforeach; ?>
          </div>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
