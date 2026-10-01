<?php
/**
 * Breadcrumb trail. Expects $page['breadcrumbs'] as [['label','path'], ...]
 * WITHOUT Inicio — this partial prepends it, exactly like jsonld_breadcrumbs()
 * does, so the visible trail and the structured data cannot drift apart.
 *
 * The last entry is rendered as the current page, not a link.
 */

declare(strict_types=1);

/* Prefixed locals: an include shares the caller's scope (see header.php). */
$bcCrumbs = $page['breadcrumbs'] ?? [];
if ($bcCrumbs === []) {
    return;
}

$bcTrail = array_merge([['label' => ui('nav.home'), 'path' => '/']], $bcCrumbs);
$bcLast  = count($bcTrail) - 1;
?>
<nav class="breadcrumbs" aria-label="<?= e(ui('service.breadcrumb')) ?>">
  <ol>
    <?php foreach ($bcTrail as $bcIndex => $bcCrumb): ?>
      <li>
        <?php if ($bcIndex === $bcLast): ?>
          <span aria-current="page"><?= e($bcCrumb['label']) ?></span>
        <?php else: ?>
          <a href="<?= e($bcCrumb['path']) ?>"><?= e($bcCrumb['label']) ?></a>
        <?php endif; ?>
      </li>
    <?php endforeach; ?>
  </ol>
</nav>
