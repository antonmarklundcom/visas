<?php
/**
 * Renders one blog article. Every /blog/<slug>/index.php sets $slug and
 * $sections (and optionally $faq) before requiring this file — the body
 * content lives in each article's own file, not in content/blog.php, because
 * no other page reuses it.
 *
 *   $slug      string  required — looked up in content/blog.php
 *   $sections  array   [['h2' => ..., 'body' => string[], 'items'? => [...]]]
 *   $faq       array   optional [['q' => ..., 'a' => ...], ...]
 *   $toolLink  array   optional calculator callout(s) rendered right after the
 *                       article body: either one ['path' => '/herramientas/<slug>/',
 *                       'label' => ..., 'text' => ...] or a list of those
 *
 */

declare(strict_types=1);

/** @var string $slug */
/** @var array $sections */
$sections = $sections ?? [];
$faq      = $faq ?? [];
$toolLink = $toolLink ?? [];

$article = null;
foreach (content('blog') as $entry) {
    if ($entry['slug'] === ($slug ?? '')) {
        $article = $entry;
        break;
    }
}

if ($article === null) {
    http_response_code(404);
    require ROOT_DIR . '/404.php';
    return;
}

/* Reading time from the article's own words, not a manually maintained field
   that could drift from the actual body. */
$wordCount = 0;
foreach ($sections as $articleSection) {
    foreach ($articleSection['body'] ?? [] as $paragraph) {
        $wordCount += str_word_count($paragraph);
    }
    foreach ($articleSection['items'] ?? [] as $sectionItem) {
        $wordCount += str_word_count(($sectionItem['title'] ?? '') . ' ' . ($sectionItem['text'] ?? ''));
    }
}
$readingMinutes = max(1, (int) ceil($wordCount / 200));

$relatedSlugs = [];
if (!empty($article['service'])) {
    $relatedSlugs[] = $article['service'];
    $primaryService  = services($article['service']);
    foreach ($primaryService['related'] ?? [] as $relatedSlug) {
        if (count($relatedSlugs) >= 3) {
            break;
        }
        if (!in_array($relatedSlug, $relatedSlugs, true)) {
            $relatedSlugs[] = $relatedSlug;
        }
    }
}

$page = [
    'title'       => $article['seoTitle'] ?? '',
    'description' => $article['description'],
    'path'        => '/blog/' . $article['slug'] . '/',
    'ogType'      => 'article',
    'breadcrumbs' => [
        ['label' => ui('nav.blog'), 'path' => '/blog/'],
        ['label' => $article['title'], 'path' => '/blog/' . $article['slug'] . '/'],
    ],
    'faq'         => $faq,
    /* An article has no service of its own, so it borrows the one it is about. Articles with no
       `service` fall through to the model's neutral default. */
    'leadSlug'    => $article['service'] ?? null,
    'article'     => [
        'headline'      => $article['title'],
        'datePublished' => $article['date'],
        'dateModified'  => $article['updated'] ?? $article['date'],
        'description'   => $article['description'],
    ],
];
if ($page['title'] === '') {
    $page['title'] = $article['title'];
}

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">

  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <p class="eyebrow"><?= e(ui('nav.blog')) ?></p>
        <h1><?= e($article['title']) ?></h1>
        <p class="lead"><?= e($article['description']) ?></p>
        <p class="article-meta">
          <span><?= e(fmt_date_long($article['date'])) ?></span>
          <span aria-hidden="true">·</span>
          <span><?= (int) $readingMinutes ?> <?= e(ui('article.reading_time')) ?></span>
          <?php if (!empty($article['updated']) && $article['updated'] !== $article['date']): ?>
            <span aria-hidden="true">·</span>
            <span><?= e(ui('article.updated')) ?> <?= e(fmt_date_long($article['updated'])) ?></span>
          <?php endif; ?>
        </p>
        <?php if (!empty($article['tags'])): ?>
          <ul class="article-tags">
            <?php foreach ($article['tags'] as $tag): ?>
              <li class="pill"><?= e($tag) ?></li>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      </div>
    </div>
  </section>

  <?php if ($sections !== []): ?>
    <section class="section">
      <div class="container prose stack">
        <?php foreach ($sections as $articleSection): ?>
          <div>
            <?php if (!empty($articleSection['h2'])): ?>
              <h2><?= e($articleSection['h2']) ?></h2>
            <?php endif; ?>
            <?php foreach ($articleSection['body'] ?? [] as $paragraph): ?>
              <p><?= e($paragraph) ?></p>
            <?php endforeach; ?>
            <?php if (!empty($articleSection['items'])): ?>
              <ul class="checklist mt-4">
                <?php foreach ($articleSection['items'] as $sectionItem): ?>
                  <li><span><?php if (!empty($sectionItem['title'])): ?><strong><?= e($sectionItem['title']) ?>:</strong> <?php endif; ?><?= e($sectionItem['text'] ?? '') ?></span></li>
                <?php endforeach; ?>
              </ul>
            <?php endif; ?>
          </div>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

  <?php $toolLinkList = array_key_exists('path', $toolLink) ? [$toolLink] : $toolLink; ?>
  <?php if ($toolLinkList !== []): ?>
    <section class="section section--surface">
      <div class="container">
        <?php if (count($toolLinkList) > 1): ?><div class="grid grid--2"><?php endif; ?>
          <?php foreach ($toolLinkList as $oneToolLink): ?>
            <a class="card card--link" href="<?= e($oneToolLink['path']) ?>">
              <h2 class="card-title"><?= e($oneToolLink['label'] ?? '') ?></h2>
              <p class="card__text"><?= e($oneToolLink['text'] ?? '') ?></p>
            </a>
          <?php endforeach; ?>
        <?php if (count($toolLinkList) > 1): ?></div><?php endif; ?>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($faq !== []): ?>
    <section class="section section--surface">
      <div class="container">
        <?php $faqItems = $faq; ?>
        <?php require ROOT_DIR . '/partials/faq.php'; ?>
      </div>
    </section>
  <?php endif; ?>

  <?php if ($relatedSlugs !== []): ?>
    <section class="section">
      <div class="container">
        <h2><?= e(ui('service.related')) ?></h2>
        <div class="mt-4">
          <?php $gridSlugs = $relatedSlugs; ?>
          <?php require ROOT_DIR . '/partials/service-card-grid.php'; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
