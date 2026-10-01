/**
 * Market module: Sweden — the client-side counterpart of lib/market/se.php.
 * Same window.Market shape as assets/js/market/py.js; see that file for the
 * contract. The reference tables are empty until a site fills them in, exactly
 * as in the PHP module.
 */
(function (window) {
  "use strict";

  var groups = new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 });

  /** Whole kronor, sv-SE: 1 500 000 kr. Normal spaces, to match fmt_money(). */
  function fmtMoney(amount) {
    return groups.format(Math.round(Number(amount) || 0)).replace(/[\s\u00a0\u202f]/g, " ") + " kr";
  }

  /** The Luhn check digit for the first nine digits of an org.nr/personnummer. */
  function taxIdCheckDigit(base) {
    var total = 0;
    var double = true;

    for (var i = 0; i < base.length; i++) {
      var digit = parseInt(base.charAt(i), 10);
      if (double) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      total += digit;
      double = !double;
    }

    return (10 - (total % 10)) % 10;
  }

  /** Validate "556016-0680", "5560160680" or a 12-digit personnummer. */
  function validateTaxId(id) {
    var clean = String(id || "").replace(/[^0-9]/g, "");
    if (clean.length === 12) {
      clean = clean.slice(2);
    }
    if (clean.length !== 10) {
      return false;
    }
    return taxIdCheckDigit(clean.slice(0, 9)) === parseInt(clean.slice(-1), 10);
  }

  var tables = { laboral: {}, vencimientos: {} };

  window.Market = {
    id: "se",
    currency: "SEK",
    locale: "sv-SE",
    vat: { standard: 25, reduced: [12, 6] },
    fmtMoney: fmtMoney,
    validateTaxId: validateTaxId,
    taxIdCheckDigit: taxIdCheckDigit,
    table: function (name) {
      return tables[name] || {};
    }
  };
})(window);
