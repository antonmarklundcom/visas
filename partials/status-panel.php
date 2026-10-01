<?php
/**
 * The panel that sits at the foot of the homepage hero (the "Panel del cliente"
 * mock on the design canvas).
 *
 * Two rules it exists to enforce. It shows no client name and no invented
 * figure: a panel is decoration, and decoration must never state a fact nobody
 * confirmed. And it is not headed "client portal", because a panel by that name
 * would promise a login that does not exist — it illustrates the recurring
 * deliverable instead, and says so in its own footer.
 *
 *   $panelTitle  string  defaults to ui('panel.title')
 *   $panelTiles  array   [['label' => ..., 'value' => ...], ...]
 */

declare(strict_types=1);

$panelTitle = $panelTitle ?? ui('panel.title');
$panelTiles = $panelTiles ?? content('ui')['panel']['tiles'];
?>
<div class="status-panel">
  <div class="status-panel__head">
    <span><?= e($panelTitle) ?></span>
    <span class="badge-ok"><?= e(ui('panel.badge')) ?></span>
  </div>

  <div class="status-panel__tiles">
    <?php foreach ($panelTiles as $panelTile): ?>
      <div class="status-tile">
        <span class="status-tile__label"><?= e($panelTile['label']) ?></span>
        <span class="status-tile__value"><?= e($panelTile['value']) ?></span>
      </div>
    <?php endforeach; ?>
  </div>

  <div class="status-panel__foot">
    <span><?= e(ui('panel.foot')) ?></span>
    <span class="status-panel__note"><?= e(ui('panel.note')) ?></span>
  </div>
</div>
<?php
unset($panelTitle, $panelTiles, $panelTile);
