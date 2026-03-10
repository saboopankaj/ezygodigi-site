(function (w) {
  const SDK = {};
  let CONFIG = null;
  let pageStart = Date.now();

  /* =========================
     ANONYMOUS VISITOR ID
  ========================= */
function getUID(siteKey) {
  const k = "__anon_uid_" + siteKey;
  let id = localStorage.getItem(k);

  if (!id) {
    id = (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : 'uid_' + Math.random().toString(36).slice(2) + Date.now();

    localStorage.setItem(k, id);
  }

  return id;
}


  /* =========================
     SEND EVENT
  ========================= */
function send(event, data) {
  if (!CONFIG) return;

  try {
    navigator.sendBeacon(
      CONFIG.endpoint,
      JSON.stringify({
        site_key: CONFIG.siteKey,
        uid: getUID(CONFIG.siteKey),
        event,
        page: location.pathname,
        referrer: document.referrer || null,
        ts: Date.now(),
        data: data || null
      })
    );
  } catch (e) {
    // silently fail
  }
}


  /* =========================
     INIT
  ========================= */
  SDK.init = function (cfg) {
    if (!cfg || !cfg.siteKey) return;

    CONFIG = {
      siteKey: cfg.siteKey,
      // 🔴 IMPORTANT: must be Worker URL
      endpoint: cfg.endpoint || "https://ezygodigi.in/track"
    };

    pageStart = Date.now();

    // PAGE VIEW
    send("page_view");
  };

  /* =========================
     GENERIC CLICK TRACKING
     (GLOBAL, NO HARDCODE)
  ========================= */
document.addEventListener("click", function (e) {
  if (!CONFIG) return;

  const el = e.target.closest("a, button, [data-track]");
  if (!el) return;

  const action =
    el.getAttribute("data-track") ||
    el.getAttribute("aria-label") ||
    el.id ||
    el.name ||
    el.innerText?.trim().slice(0, 40) ||
    el.tagName.toLowerCase();

  const data = {
    tag: el.tagName.toLowerCase(),
    href: el.getAttribute("href") || null,
    path: getDomPath(el)
  };

  // 🔥 AUTO PICK PRODUCT CONTEXT
  if (el.dataset.productName) {
    data.product_name = el.dataset.productName;
  }

  if (el.dataset.productId) {
    data.product_id = el.dataset.productId;
  }

  if (el.dataset.variantId) {
    data.variant_id = el.dataset.variantId;
  }

  send(`click:${action.replace(/\s+/g, "_").toLowerCase()}`, data);
});





  /* =========================
     EVENT SPECIFIC CLICK TRACKING
     (GLOBAL, NO HARDCODE)
  ========================= */
document.addEventListener("analytics:event", function (e) {
  if (!CONFIG || !e.detail) return;

  send(e.detail.event, e.detail.data);
});


  /* =========================
     TIME SPENT (EXIT / TAB HIDE)
  ========================= */
  document.addEventListener("visibilitychange", function () {
    if (!CONFIG) return;

    if (document.visibilityState === "hidden") {
      navigator.sendBeacon(
        CONFIG.endpoint,
        JSON.stringify({
          site_key: CONFIG.siteKey,
          uid: getUID(CONFIG.siteKey),
          event: "time_spent",
          page: location.pathname,
          ms: Date.now() - pageStart,
          ts: Date.now()
        })
      );
    }
  });

  /* =========================
     PUBLIC API
  ========================= */
  SDK.track = send;

  SDK.disable = function () {
    CONFIG = null;
  };

  w.Analytics = SDK;
})(window);
function getDomPath(el) {
  if (!el || el === document.body) return "body";

  const stack = [];
  while (el && el.nodeType === 1 && el !== document.body) {
    let selector = el.tagName.toLowerCase();

    if (el.id) {
      selector += "#" + el.id;
      stack.unshift(selector);
      break;
    } else {
      let sib = el, nth = 1;
      while ((sib = sib.previousElementSibling)) {
        if (sib.tagName === el.tagName) nth++;
      }
      selector += `:nth-of-type(${nth})`;
    }

    stack.unshift(selector);
    el = el.parentElement;
  }

  return stack.join(" > ");
}
