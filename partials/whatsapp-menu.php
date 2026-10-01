<?php
/**
 * The WhatsApp menu. ONE panel per page, rendered next to the
 * floating button in partials/footer.php; every trigger on the page — the
 * header pill, the drawer pill, the floating button and (same element) the
 * mobile sticky bar — opens this one.
 *
 * Options come from content/lead-values.php: the current page's service first
 * and pre-highlighted, then the owner's four priority services, then "otra
 * consulta". Each option is its own wa.me link with its own prefill and its
 * own `data-service`, so whatsapp_click is attributable per service
 * (assets/js/analytics.js).
 *
 * Progressive enhancement: the panel ships `hidden` and every trigger is an
 * ordinary link to this page's own prefill, so without JS a visitor still
 * reaches WhatsApp with a service-specific message — they just don't get the
 * menu.
 */

declare(strict_types=1);

$waMenuOptions = array_values(array_filter(
    whatsapp_menu(),
    static fn (array $waOption) => $waOption['link'] !== null
));

if ($waMenuOptions === []) {
    return;   // no WhatsApp number configured — the triggers stay plain links
}
?>
<div class="wa-menu" id="wa-menu" data-wa-menu hidden>
  <div class="wa-menu__backdrop" data-wa-close aria-hidden="true"></div>

  <div class="wa-menu__panel" role="dialog" aria-labelledby="wa-menu-title">
    <div class="wa-menu__head">
      <p class="wa-menu__title" id="wa-menu-title"><?= e(ui('whatsapp.menu_title')) ?></p>
      <button class="wa-menu__close" type="button" data-wa-close
              aria-label="<?= e(ui('whatsapp.close_menu')) ?>">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <ul class="wa-menu__list">
      <?php foreach ($waMenuOptions as $waOption): ?>
        <li>
          <a class="wa-menu__option<?= $waOption['current'] ? ' wa-menu__option--current' : '' ?>"
             href="<?= e($waOption['link']) ?>" rel="noopener"
             data-service="<?= e($waOption['slug']) ?>">
            <span class="wa-menu__label">
              <?= e($waOption['label']) ?>
              <?php if ($waOption['current']): ?>
                <span class="wa-menu__badge"><?= e(ui('whatsapp.this_page')) ?></span>
              <?php endif; ?>
            </span>
            <span class="wa-menu__text"><?= e($waOption['text']) ?></span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>

    <p class="wa-menu__note"><?= e(ui('whatsapp.menu_note')) ?></p>
  </div>
</div>
<?php
unset($waMenuOptions, $waOption);
