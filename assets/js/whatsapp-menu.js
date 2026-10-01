/**
 * The WhatsApp menu.
 *
 * Every [data-wa-trigger] — the header pill, the drawer pill and the floating
 * button, which is the sticky bottom bar at <= 768px — opens the one
 * [data-wa-menu] panel rendered by partials/whatsapp-menu.php. Each option is
 * an ordinary wa.me link with its own prefill, so the menu is a list of links,
 * not a widget that builds URLs.
 *
 * Progressive enhancement: without this file the triggers stay plain links to
 * the current page's own prefill and the panel stays hidden. Nothing here
 * invents a URL, so a failure degrades to "WhatsApp opens with this page's
 * message" rather than to a dead button.
 */
(function (window, document) {
  "use strict";

  var menu = document.querySelector("[data-wa-menu]");
  var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-wa-trigger]"));

  if (!menu || triggers.length === 0) {
    return;
  }

  var panel = menu.querySelector(".wa-menu__panel");
  var options = Array.prototype.slice.call(menu.querySelectorAll(".wa-menu__option"));
  var lastTrigger = null;

  /* The triggers are links by default so no-JS keeps working; once the menu
     exists they are buttons that happen to be marked up as links. */
  triggers.forEach(function (trigger) {
    trigger.setAttribute("role", "button");
    trigger.setAttribute("aria-haspopup", "dialog");
  });

  function isOpen() {
    return !menu.hidden;
  }

  function open(trigger) {
    lastTrigger = trigger || null;
    menu.hidden = false;
    triggers.forEach(function (t) {
      t.setAttribute("aria-expanded", t === trigger ? "true" : "false");
    });

    /* The pre-highlighted current-page option is where a visitor most likely
       wants to go, so that is what receives focus. */
    var first = menu.querySelector(".wa-menu__option--current") || options[0];
    if (first) {
      first.focus();
    }
  }

  function close(returnFocus) {
    if (!isOpen()) {
      return;
    }
    menu.hidden = true;
    triggers.forEach(function (t) {
      t.setAttribute("aria-expanded", "false");
    });
    if (returnFocus && lastTrigger) {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      if (isOpen()) {
        close(true);
      } else {
        open(trigger);
      }
    });

    /* A link already opens on Enter; role="button" promises Space as well. */
    trigger.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        open(trigger);
      }
    });
  });

  menu.querySelectorAll("[data-wa-close]").forEach(function (closer) {
    closer.addEventListener("click", function (e) {
      e.preventDefault();
      close(true);
    });
  });

  /* Choosing an option navigates to WhatsApp; the panel should not still be
     open when the visitor comes back to the tab. */
  options.forEach(function (option) {
    option.addEventListener("click", function () {
      close(false);
    });
  });

  document.addEventListener("click", function (e) {
    if (!isOpen()) {
      return;
    }
    if (panel && panel.contains(e.target)) {
      return;
    }
    if (triggers.some(function (t) { return t.contains(e.target); })) {
      return;   // the trigger's own handler already toggled it
    }
    close(false);
  });

  document.addEventListener("keydown", function (e) {
    if (!isOpen()) {
      return;
    }
    if (e.key === "Escape") {
      close(true);
      return;
    }
    if (e.key !== "Tab") {
      return;
    }

    /* Keep Tab inside the panel while it is open: it is a small dialog and
       tabbing out of it silently would leave a visitor lost behind it. In DOM
       order, not option order — the close button precedes the list, so a
       hand-built [options..., close] array would wrap in the wrong place. */
    var focusable = Array.prototype.slice.call(
      menu.querySelectorAll('.wa-menu__option, [data-wa-close]:not([aria-hidden="true"])')
    );
    if (focusable.length === 0) {
      return;
    }
    var firstEl = focusable[0];
    var lastEl = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  });
})(window, document);
