/**
 * Upgrades the lead form from a full page POST to an inline success message.
 *
 * Without this file the form still works: enviar.php answers a normal POST with
 * a redirect to /contacto/?enviado=1&s=<slug>, which renders the same
 * per-service thank-you server-side. Everything here is an enhancement, so any
 * failure falls back to submitting the form the ordinary way.
 *
 * The thank-you and the conversion event both come
 * from the handler's own JSON response, not from anything computed here. The
 * server already resolved the service, its tier and the Ads conversion value
 * from content/lead-values.php; duplicating that logic in the browser is how
 * the two drift apart — and how a lead ends up reported at a value the CRM
 * never recorded.
 */
(function (document) {
  "use strict";

  /**
   * Rewrites the pre-rendered thank-you with what the server actually recorded.
   * The block already carries this page's copy, so a response with no `thanks`
   * (an older handler, a proxy that ate the body) simply leaves it as it is.
   */
  function renderThanks(node, thanks) {
    if (!node || !thanks) {
      return;
    }

    var list = node.querySelector(".thanks__steps");
    if (list && Array.isArray(thanks.steps) && thanks.steps.length) {
      list.innerHTML = "";
      thanks.steps.forEach(function (step) {
        var li = document.createElement("li");
        li.textContent = step;
        list.appendChild(li);
      });
    }

    var wa = node.querySelector(".btn--whatsapp");
    if (wa && thanks.whatsapp) {
      wa.href = thanks.whatsapp;
    }

    var next = node.querySelector(".btn--secondary");
    if (next && thanks.link && thanks.link.path) {
      next.href = thanks.link.path;
      next.textContent = thanks.link.label || next.textContent;
      next.hidden = false;
    } else if (next && !thanks.link) {
      next.hidden = true;
    }
  }

  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    var button = form.querySelector("[data-submit]");
    var ok = form.querySelector("[data-form-ok]");
    var error = form.querySelector("[data-form-error]");
    var label = button ? button.textContent : "";
    var sending = false;

    form.addEventListener("submit", function (e) {
      if (sending) {
        e.preventDefault();
        return;
      }
      if (!form.reportValidity()) {
        return;
      }

      e.preventDefault();
      sending = true;
      if (ok) ok.hidden = true;
      if (error) error.hidden = true;
      if (button) {
        button.disabled = true;
        button.textContent = button.dataset.sending || label;
      }

      fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (!data || !data.ok) {
            throw new Error(data && data.error ? data.error : "failed");
          }
          form.querySelectorAll("input:not([type=hidden]), textarea").forEach(function (field) {
            if (field.type === "radio") {
              field.checked = false;
            } else {
              field.value = "";
            }
          });
          if (ok) {
            renderThanks(ok, data.thanks);
            ok.hidden = false;
            ok.focus && ok.focus();
          }
          if (window.siteAnalytics) {
            /* value + currency are what Google Ads bids on, so
               they are reported exactly as the handler resolved them. */
            window.siteAnalytics.track("lead_submit", {
              form_id: (form.querySelector("[name=form_id]") || {}).value || "",
              service: data.service || "",
              value_tier: data.value_tier || "",
              value: data.value || 0,
              currency: data.currency || "PYG",
              degraded: !!data.degraded
            });
          }
        })
        .catch(function () {
          if (error) error.hidden = false;
        })
        .finally(function () {
          sending = false;
          if (button) {
            button.disabled = false;
            button.textContent = label;
          }
        });
    });
  });
})(document);
