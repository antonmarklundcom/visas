<?php
/**
 * "Rubros que atendemos". Stands in for the Casos band while there are no real
 * testimonials, and works on its own on service pages.
 *
 * A rubro is a sector we work in, not a client — nothing here needs the owner to
 * confirm a name, a number or a quote.
 *
 * Reusable and parameterised, shared chrome — parameterise it, do not edit it:
 *
 *   $industriesEyebrow  string  defaults to ui('industries.eyebrow')
 *   $industriesTitle    string  defaults to ui('industries.title')
 *   $industriesLead     string  defaults to ui('industries.lead'), '' hides it
 *   $industriesItems    array   defaults to ui industries.items. Each entry is
 *                               either a plain string (no link) or
 *                               ['label' => ..., 'path' => ...] — * every default item links to its
 *                               its real segment page
 *   $industriesSurface  bool    surface band (default) or white
 */

declare(strict_types=1);

$industriesEyebrow = $industriesEyebrow ?? ui('industries.eyebrow');
$industriesTitle   = $industriesTitle   ?? ui('industries.title');
$industriesLead    = $industriesLead    ?? ui('industries.lead');
$industriesItems   = $industriesItems   ?? content('ui')['industries']['items'];
$industriesSurface = $industriesSurface ?? true;

if ($industriesItems !== []) :
?>
<section class="section<?= $industriesSurface ? ' section--surface' : '' ?>">
  <div class="container">
    <div class="section-head section-head--split">
      <div class="section-head__text">
        <?php if ($industriesEyebrow !== ''): ?>
          <p class="eyebrow"><?= e($industriesEyebrow) ?></p>
        <?php endif; ?>
        <h2><?= e($industriesTitle) ?></h2>
      </div>
      <?php if ($industriesLead !== ''): ?>
        <p class="section-head__aside"><?= e($industriesLead) ?></p>
      <?php endif; ?>
    </div>

    <ul class="industries">
      <?php foreach ($industriesItems as $industry): ?>
        <?php
          $industryLabel = is_array($industry) ? ($industry['label'] ?? '') : $industry;
          $industryPath  = is_array($industry) ? ($industry['path']  ?? '') : '';
        ?>
        <li>
          <?php if ($industryPath !== ''): ?>
            <a class="industries__item" href="<?= e($industryPath) ?>"><?= e($industryLabel) ?></a>
          <?php else: ?>
            <span class="industries__item"><?= e($industryLabel) ?></span>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>
<?php endif; ?>
<?php
unset(
    $industriesEyebrow, $industriesTitle, $industriesLead, $industriesItems, $industriesSurface,
    $industry, $industryLabel, $industryPath
);
