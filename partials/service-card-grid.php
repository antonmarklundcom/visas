<?php
/**
 * A grid of service cards. Two ways to call it:
 *
 *   $gridSlugs  string[]  slugs from content/services.php, in display order.
 *                         Each card shows the service's navLabel and its
 *                         metaDescription, so the grid stays correct as the
 *                         copy is rewritten.
 *   $gridCards  array     explicit cards, for the homepage, where one card
 *                         covers several legacy pages:
 *                         ['title', 'text', 'path', 'links' => [['label','path']]]
 *
 * $gridCards wins when both are set.
 *
 *   $gridNumbered  bool  show the 01–06 numerals 
 *   $gridStart     int   first numeral when $gridNumbered
 *   $gridCols      int   3 (default) or 2
 *
 * A card with no secondary links is one big anchor. A card that has them cannot
 * be — an anchor inside an anchor is invalid — so it becomes an article whose
 * heading carries the primary link and whose footer lists the rest.
 *
 * Reusable and parameterised, shared chrome — parameterise it, do not edit it.
 */

declare(strict_types=1);

/* Prefixed locals: an include shares the caller's scope (see header.php). */
$gridCards    = $gridCards ?? null;
$gridSlugs    = $gridSlugs ?? null;
$gridNumbered = $gridNumbered ?? false;
$gridStart    = $gridStart ?? 1;
$gridCols     = $gridCols ?? 3;

if ($gridCards === null) {
    $gridCards = [];
    foreach ($gridSlugs ?? array_keys(services()) as $gridSlug) {
        $gridService = services($gridSlug);
        if ($gridService === null) {
            continue;
        }
        $gridCards[] = [
            'title' => $gridService['navLabel'],
            'text'  => $gridService['metaDescription'],
            'path'  => $gridService['path'],
            'links' => [],
        ];
    }
}

$gridN = $gridStart;
?>
<div class="grid grid--<?= (int) $gridCols ?>">
  <?php foreach ($gridCards as $gridCard): ?>
    <?php $gridLinks = $gridCard['links'] ?? []; ?>

    <?php if ($gridLinks === []): ?>
      <a class="card card--link" href="<?= e($gridCard['path']) ?>">
        <?php if ($gridNumbered): ?>
          <span class="card__num" aria-hidden="true"><?= e(str_pad((string) $gridN++, 2, '0', STR_PAD_LEFT)) ?></span>
        <?php endif; ?>
        <h3 class="card-title"><?= e($gridCard['title']) ?></h3>
        <p class="card__text"><?= e($gridCard['text']) ?></p>
      </a>
    <?php else: ?>
      <article class="card card--service">
        <?php if ($gridNumbered): ?>
          <span class="card__num" aria-hidden="true"><?= e(str_pad((string) $gridN++, 2, '0', STR_PAD_LEFT)) ?></span>
        <?php endif; ?>
        <h3 class="card-title"><a href="<?= e($gridCard['path']) ?>"><?= e($gridCard['title']) ?></a></h3>
        <p class="card__text"><?= e($gridCard['text']) ?></p>
        <ul class="card__links">
          <?php foreach ($gridLinks as $gridLink): ?>
            <li><a href="<?= e($gridLink['path']) ?>"><?= e($gridLink['label']) ?></a></li>
          <?php endforeach; ?>
        </ul>
      </article>
    <?php endif; ?>

  <?php endforeach; ?>
</div>
<?php
/* An include shares the caller's scope, so leaving these set would silently
   carry into the next grid on the same page. Clear them on the way out. */
unset($gridCards, $gridSlugs, $gridNumbered, $gridStart, $gridCols, $gridN, $gridCard, $gridLinks, $gridLink, $gridSlug, $gridService);
