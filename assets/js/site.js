/**
 * Header behaviour: the services mega-menu and the mobile drawer.
 *
 * Progressive enhancement — without JS the nav still renders every link,
 * because the mega panel is a plain <ul> that this script hides on load.
 */
(function (document) {
  "use strict";

  var header = document.querySelector("[data-header]");
  if (!header) {
    return;
  }

  var drawer = header.querySelector("[data-nav]");
  var toggle = header.querySelector("[data-nav-toggle]");
  var megaButton = header.querySelector("[data-mega-toggle]");
  var mega = header.querySelector("[data-mega]");
  var desktop = window.matchMedia("(min-width: 901px)");

  /* Hidden only once JS is running, so a no-JS visitor keeps the full list. */
  if (mega && megaButton) {
    mega.hidden = true;
    megaButton.setAttribute("aria-expanded", "false");
  }
  if (drawer && toggle && !desktop.matches) {
    drawer.hidden = true;
  }

  function setMega(open) {
    if (!mega || !megaButton) {
      return;
    }
    mega.hidden = !open;
    megaButton.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function setDrawer(open) {
    if (!drawer || !toggle) {
      return;
    }
    drawer.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? toggle.dataset.labelClose : toggle.dataset.labelOpen;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      setMega(true);
    }
  }

  if (megaButton) {
    megaButton.addEventListener("click", function () {
      setMega(mega.hidden);
    });
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setDrawer(drawer.hidden);
    });
  }

  document.addEventListener("click", function (e) {
    if (desktop.matches && mega && !mega.hidden && !header.contains(e.target)) {
      setMega(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") {
      return;
    }
    if (drawer && !drawer.hidden && !desktop.matches) {
      setDrawer(false);
      toggle.focus();
    } else if (mega && !mega.hidden) {
      setMega(false);
      megaButton.focus();
    }
  });

  /* Crossing the breakpoint resets both, so a drawer left open on a phone does
     not become a stuck overlay on a rotated tablet. */
  desktop.addEventListener("change", function (e) {
    document.body.style.overflow = "";
    if (e.matches) {
      if (drawer) {
        drawer.hidden = false;
      }
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = toggle.dataset.labelOpen;
      }
      setMega(false);
    } else {
      setDrawer(false);
      setMega(true);
    }
  });
})(document);
