<?php
/**
 * FAQ block from [['q' => ..., 'a' => ...], ...]. Native <details>, so it works
 * without JS and is keyboard-operable for free.
 *
 * The caller also puts the same array in $page['faq'] so lib/seo.php emits the
 * matching FAQPage JSON-LD — the two must always come from one source.
 *
 *   $faqItems  array   required
 *   $faqTitle  string  heading, defaults to ui('service.faq')
 */

declare(strict_types=1);

$faqItems = $faqItems ?? [];
if ($faqItems === []) {
    return;
}
$faqTitle = $faqTitle ?? ui('service.faq');
?>
<h2><?= e($faqTitle) ?></h2>
<div class="faq mt-4">
  <?php foreach ($faqItems as $faqItem): ?>
    <?php if (empty($faqItem['q']) || empty($faqItem['a'])) { continue; } ?>
    <details>
      <summary><?= e($faqItem['q']) ?></summary>
      <p><?= e($faqItem['a']) ?></p>
    </details>
  <?php endforeach; ?>
</div>
