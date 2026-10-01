<?php
/**
 * Visa cost calculator: official consular fee + optional integrity fee + our
 * advisory service, for N people, converted to guaraníes at an editable rate.
 * The arithmetic lives in assets/js/tools/costo-visa-eeuu.js.
 */

require __DIR__ . '/../../lib/bootstrap.php';

$slug = 'costo-visa-eeuu';
$tool = content('tools')[$slug];

ob_start();
?>
<div class="tool card" data-tool="<?= e($slug) ?>">
  <form class="tool-form" id="costo-form" novalidate>
    <div class="tool-form__row">
      <label class="field">
        <span>Personas que solicitan</span>
        <input type="number" inputmode="numeric" min="1" max="20" step="1" value="1" name="personas" id="costo-personas" required>
      </label>
      <label class="field">
        <span>Tasa consular por persona (USD)</span>
        <input type="number" inputmode="numeric" min="0" step="1" value="185" name="tasa" id="costo-tasa" required>
      </label>
    </div>
    <div class="tool-form__row">
      <label class="field">
        <span>Tipo de cambio (₲ por USD)</span>
        <input type="number" inputmode="numeric" min="1" step="1" value="5900" name="cambio" id="costo-cambio" required>
      </label>
      <label class="field">
        <span>Nuestro servicio de asesoría</span>
        <select name="servicio" id="costo-servicio">
          <option value="0">Ninguno, lo hago por mi cuenta</option>
          <option value="190000">Revisión del DS-160 (₲ 190.000 por persona)</option>
          <option value="450000">Acompañamiento B1/B2 (₲ 450.000 por persona)</option>
          <option value="690000">Acompañamiento completo (₲ 690.000 por persona)</option>
        </select>
      </label>
    </div>

    <fieldset class="field">
      <legend>Tasa de integridad de visa de 250 USD</legend>
      <div class="chip-row">
        <input class="chip-radio" type="radio" name="integridad" id="costo-int-no" value="0" checked>
        <label class="chip" for="costo-int-no">No incluirla</label>
        <input class="chip-radio" type="radio" name="integridad" id="costo-int-si" value="250">
        <label class="chip" for="costo-int-si">Incluirla (si ya es obligatoria)</label>
      </div>
    </fieldset>

    <div class="btn-row">
      <button class="btn btn--primary" type="submit"><?= e(ui('tools.calculate')) ?></button>
    </div>
  </form>

  <div class="tool-result" id="costo-result" hidden aria-live="polite">
    <h2 class="card-title"><?= e(ui('tools.result_title')) ?></h2>
    <dl class="tool-result__lines">
      <dt>Tasas oficiales (a pagar al gobierno)</dt>
      <dd id="costo-oficial"></dd>
      <dt>Nuestro servicio (opcional)</dt>
      <dd id="costo-servicio-total"></dd>
      <dt>Total estimado</dt>
      <dd id="costo-total"></dd>
    </dl>
    <p class="note" id="costo-usd"></p>
    <div class="btn-row mt-3">
      <button class="btn btn--secondary" type="button" id="costo-use-result"><?= e(ui('tools.use_result')) ?></button>
    </div>
  </div>

  <noscript><p class="note"><?= e(ui('tools.need_js')) ?></p></noscript>
</div>

<?php
$formId      = $slug;
$formService = $slug;
$formNeed    = $tool['formNeed'];
$formHeading = ui('form.legend');
$formSourcePage = $tool['path'];
require ROOT_DIR . '/partials/lead-form.php';
?>
<?php
$toolCalcHtml = ob_get_clean();

require ROOT_DIR . '/templates/tool.php';
