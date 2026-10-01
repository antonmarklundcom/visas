/**
 * Visa cost calculator: official fees (USD) for N people, our optional service
 * (guaraníes) and the total in guaraníes at the visitor's exchange rate.
 * Official fees are estimates the visitor can edit; they are never presented
 * as confirmed amounts.
 */
(function (window, document) {
  "use strict";

  var form = document.getElementById("costo-form");
  if (!form || !window.Market) {
    return;
  }

  var el = function (id) { return document.getElementById(id); };
  var lastResult = null;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var personas = Math.max(1, Math.min(20, parseInt(el("costo-personas").value, 10) || 0));
    var tasa     = parseFloat(el("costo-tasa").value) || 0;
    var cambio   = parseFloat(el("costo-cambio").value) || 0;
    var servicio = parseFloat(el("costo-servicio").value) || 0;
    var integ    = parseFloat((form.querySelector('input[name="integridad"]:checked') || {}).value) || 0;

    if (cambio <= 0 || tasa < 0) {
      el("costo-cambio").focus();
      return;
    }

    var oficialUsd = (tasa + integ) * personas;
    var oficialGs  = Math.round(oficialUsd * cambio);
    var servicioGs = Math.round(servicio * personas);
    var totalGs    = oficialGs + servicioGs;

    el("costo-oficial").textContent       = window.Market.fmtMoney(oficialGs);
    el("costo-servicio-total").textContent = window.Market.fmtMoney(servicioGs);
    el("costo-total").textContent         = window.Market.fmtMoney(totalGs);
    el("costo-usd").textContent = "Tasas oficiales: USD " + oficialUsd + " (" + personas +
      (personas === 1 ? " persona" : " personas") + "). Estimación: confirme los montos vigentes en el sitio oficial.";
    el("costo-result").hidden = false;

    lastResult = "Personas " + personas + " · tasas oficiales " + window.Market.fmtMoney(oficialGs) +
                 " · servicio " + window.Market.fmtMoney(servicioGs) +
                 " · total " + window.Market.fmtMoney(totalGs);

    if (window.ToolsShared) {
      window.ToolsShared.trackToolUsed("costo_visa_eeuu", { people: personas });
    }
  });

  var useResult = el("costo-use-result");
  if (useResult) {
    useResult.addEventListener("click", function () {
      var leadForm = document.querySelector("form[data-lead-form]");
      if (!window.ToolsShared || !leadForm || !lastResult) {
        return;
      }
      window.ToolsShared.prefillLeadForm(leadForm, {
        need: "eeuu",
        message: lastResult,
        result: lastResult
      });
      window.ToolsShared.focusLeadForm(leadForm);
    });
  }
})(window, document);
