/*!
 * Mithora Analytics SDK
 * © 2026 Mithora
 * Unauthorized commercial use prohibited
 */
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

function getDeviceInfo() {
  const ua = navigator.userAgent;

  let device = /Mobi|Android/i.test(ua) ? "mobile" : "desktop";
  if (/Tablet|iPad/i.test(ua)) device = "tablet";

  let os = "unknown";
  if (/Windows NT/i.test(ua)) os = "windows";
  else if (/Mac OS X/i.test(ua) && !/Mobile/i.test(ua)) os = "macos";
  else if (/Android/i.test(ua)) os = "android";
  else if (/iPhone|iPad/i.test(ua)) os = "ios";
  else if (/Linux/i.test(ua)) os = "linux";

  let browser = "unknown";
  if (/Chrome\/\d+/i.test(ua) && !/Edg/i.test(ua)) browser = "chrome";
  else if (/Safari\/\d+/i.test(ua) && !/Chrome/i.test(ua)) browser = "safari";
  else if (/Firefox\/\d+/i.test(ua)) browser = "firefox";
  else if (/Edg\/\d+/i.test(ua)) browser = "edge";

  return { device, os, browser };
}

  /* =========================
     SEND EVENT
  ========================= */
function send(event, data) {
  if (!CONFIG) return;

  const deviceInfo = getDeviceInfo();

  navigator.sendBeacon(
    CONFIG.endpoint,
    JSON.stringify({
      site_key: CONFIG.siteKey,
      uid: getUID(CONFIG.siteKey),
      event,
      page: location.pathname,
      referrer: document.referrer || null,
      ts: Date.now(),
      ms: data?.ms ?? null,
      data,
      device: deviceInfo.device,
      os: deviceInfo.os,
      browser: deviceInfo.browser
    })
  );
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
