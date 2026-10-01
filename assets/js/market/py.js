/**
 * Market module: Paraguay — the client-side counterpart of lib/market/py.php.
 *
 * Every market module exposes the SAME object under window.Market, so a
 * calculator in assets/js/tools/ never asks which market it is running in:
 *
 *   Market.id           'py'
 *   Market.currency     'PYG'
 *   Market.locale       'es-PY'
 *   Market.fmtMoney(n)  → '₲ 1.500.000'
 *   Market.validateTaxId(id)      → boolean
 *   Market.taxIdCheckDigit(base)  → number
 *   Market.table(name)  reference tables, mirroring market_table() in PHP
 *
 * partials/head.php loads the module named by 'market' in content/site.php.
 */
(function (window) {
  "use strict";

  // Intl's { style: "currency", currency: "PYG" } is not used here: its symbol
  // depends on the browser's ICU data, which renders "Gs." instead of "₲" in
  // several runtimes (Node's bundled ICU among them) — inconsistent with
  // fmt_money() in lib/market/py.php, which always emits the literal "₲ "
  // prefix. Formatting only the grouping and prepending "₲ " ourselves keeps
  // the client and the server byte-for-byte identical.
  var groups = new Intl.NumberFormat("es-PY", { maximumFractionDigits: 0 });

  /** Whole guaraníes, es-PY: ₲ 1.500.000. Never decimals. */
  function fmtMoney(amount) {
    return "₲ " + groups.format(Math.round(Number(amount) || 0));
  }

  /**
   * The dígito verificador for a RUC base number (DNIT modulo-11: weights cycle
   * 2..11 from the rightmost digit).
   */
  function taxIdCheckDigit(base) {
    var total = 0;
    var k = 2;

    for (var i = base.length - 1; i >= 0; i--) {
      total += parseInt(base.charAt(i), 10) * k;
      k++;
      if (k > 11) {
        k = 2;
      }
    }

    var remainder = total % 11;
    return remainder > 1 ? 11 - remainder : 0;
  }

  /** Validate "80012345-6" or "800123456" against its check digit. */
  function validateTaxId(id) {
    var clean = String(id || "").replace(/[^0-9]/g, "");
    if (clean.length < 2) {
      return false;
    }
    return taxIdCheckDigit(clean.slice(0, -1)) === parseInt(clean.slice(-1), 10);
  }

  /* Mirrors market_table() in lib/market/py.php. Update both together. */
  var tables = {
    laboral: {
      aguinaldo: { divisor: 12 },
      ips: { obrero: 0.09, patronal: 0.165 },
      vacaciones: [
        { hastaAnios: 5, dias: 12 },
        { hastaAnios: 10, dias: 18 },
        { hastaAnios: null, dias: 30 }
      ],
      preaviso: [
        { hastaAnios: 1, dias: 30 },
        { hastaAnios: 5, dias: 45 },
        { hastaAnios: 10, dias: 60 },
        { hastaAnios: null, dias: 90 }
      ],
      indemnizacion: { diasPorAnio: 15, fraccionMinimaMeses: 6 },
      diasPorMes: 30
    },
    vencimientos: {
      calendarioPerpetuo: { 0: 7, 1: 9, 2: 11, 3: 13, 4: 15, 5: 17, 6: 19, 7: 21, 8: 23, 9: 25 },
      ipsMensual: { diaDesde: 1, diaHasta: 10 }
    }
  };

  window.Market = {
    id: "py",
    currency: "PYG",
    locale: "es-PY",
    vat: { standard: 10, reduced: [5] },
    fmtMoney: fmtMoney,
    validateTaxId: validateTaxId,
    taxIdCheckDigit: taxIdCheckDigit,
    table: function (name) {
      return tables[name] || {};
    }
  };
})(window);
