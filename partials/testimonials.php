<?php
/**
 * The "Casos" band : one featured quote on ink blue plus the rest on
 * white cards.
 *
 * Renders NOTHING when content/site.php has no testimonials. Plan §1.4 is
 * absolute: the three quotes in the design canvas are invented and never ship, and no
 * caller may pass a quote inline — the data comes from site('testimonials') and
 * nowhere else, so there is exactly one place to audit.
 *
 * Each entry: ['quote' => ..., 'name' => ..., 'business' => ?, 'city' => ?,
 *              'since' => ?]. Only 'quote' is required; every other line is
 * omitted when absent.
 *
 * Reusable and parameterised, shared chrome — parameterise it, do not edit it:
 *
 *   $testimonialsEyebrow  string  defaults to ui('testimonials.eyebrow')
 *   $testimonialsTitle    string  defaults to ui('testimonials.title')
 *   $testimonialsLimit    int     how many to show, 0 = all
 *   $testimonialsSurface  bool    surface band (default) or white
 */

declare(strict_types=1);

$testimonialsAll = array_values(array_filter(
    (array) site('testimonials'),
    static fn ($t) => is_array($t) && !empty($t['quote'])
));

if ($testimonialsAll !== []) :

    $testimonialsEyebrow = $testimonialsEyebrow ?? ui('testimonials.eyebrow');
    $testimonialsTitle   = $testimonialsTitle   ?? ui('testimonials.title');
    $testimonialsLimit   = $testimonialsLimit   ?? 3;
    $testimonialsSurface = $testimonialsSurface ?? true;

    if ($testimonialsLimit > 0) {
        $testimonialsAll = array_slice($testimonialsAll, 0, $testimonialsLimit);
    }
    $testimonialsFirst = true;
?>
<section class="section<?= $testimonialsSurface ? ' section--surface' : '' ?>">
  <div class="container">
    <div class="section-head section-head--narrow">
      <?php if ($testimonialsEyebrow !== ''): ?>
        <p class="eyebrow"><?= e($testimonialsEyebrow) ?></p>
      <?php endif; ?>
      <h2><?= e($testimonialsTitle) ?></h2>
    </div>

    <div class="quotes">
      <?php foreach ($testimonialsAll as $testimonial): ?>
        <?php
        $testimonialMeta = array_values(array_filter([
            $testimonial['business'] ?? null,
            $testimonial['city'] ?? null,
        ]));
        ?>
        <figure class="quote<?= $testimonialsFirst ? ' quote--feature' : '' ?>">
          <blockquote class="quote__text"><?= e($testimonial['quote']) ?></blockquote>
          <figcaption class="quote__by">
            <?php if (!empty($testimonial['name'])): ?>
              <strong><?= e($testimonial['name']) ?></strong>
            <?php endif; ?>
            <?php if ($testimonialMeta !== []): ?>
              <span><?= e(implode(' · ', $testimonialMeta)) ?></span>
            <?php endif; ?>
            <?php if (!empty($testimonial['since'])): ?>
              <span><?= e($testimonial['since']) ?></span>
            <?php endif; ?>
          </figcaption>
        </figure>
        <?php $testimonialsFirst = false; ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>
<?php
unset($testimonialsAll, $testimonialsEyebrow, $testimonialsTitle, $testimonialsLimit,
      $testimonialsSurface, $testimonialsFirst, $testimonial, $testimonialMeta);
