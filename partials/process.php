<?php
/**
 * The "Cómo trabajamos" four-step block .
 *
 * Reusable and parameterised — content phases render it on service pages and may not
 * modify it:
 *
 *   $processEyebrow  string    defaults to ui('process.eyebrow')
 *   $processTitle    string    defaults to ui('process.title')
 *   $processSteps    array     [['title' => ..., 'text' => ...], ...]
 *   $processTone     string    'ink' (default), 'surface' or 'plain' — the band
 *                               colour, so two dark sections never end up
 *                               adjacent and read as one
 *   $processId       string    id for an in-page anchor, omitted when empty
 *
 * Steps are numbered by position, so a caller passing three steps gets 1–3.
 */

declare(strict_types=1);

$processEyebrow = $processEyebrow ?? ui('process.eyebrow');
$processTitle   = $processTitle   ?? ui('process.title');
$processSteps   = $processSteps   ?? content('ui')['process']['steps'];
$processTone    = $processTone    ?? 'ink';
$processId      = $processId      ?? '';
$processN       = 0;

$processBand = match ($processTone) {
    'surface' => ' section--surface',
    'plain'   => '',
    default   => ' section--ink',
};
?>
<section class="section<?= $processBand ?>"<?= $processId !== '' ? ' id="' . e($processId) . '"' : '' ?>>
  <div class="container">
    <div class="section-head section-head--narrow">
      <?php if ($processEyebrow !== ''): ?>
        <p class="eyebrow"><?= e($processEyebrow) ?></p>
      <?php endif; ?>
      <h2><?= e($processTitle) ?></h2>
    </div>

    <ol class="process">
      <?php foreach ($processSteps as $processStep): ?>
        <li class="process__step">
          <span class="process__num" aria-hidden="true"><?= ++$processN ?></span>
          <h3 class="process__title"><?= e($processStep['title']) ?></h3>
          <p class="process__text"><?= e($processStep['text']) ?></p>
        </li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>
<?php
/* An include shares the caller's scope: clear the inputs so a second process
   block on the same page starts from the defaults again. */
unset($processEyebrow, $processTitle, $processSteps, $processTone, $processBand, $processId, $processN, $processStep);
