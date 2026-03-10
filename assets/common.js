/* =====================================================
   GLOBAL VISIBILITY CONFIGURATION
===================================================== */
const EZY_CONFIG = {
  whatsapp: {
    number: "917039509783",
    message: "Hello! I'm interested in your digital services. Can we discuss?"
  },
  bot: {
    enabled: false,                
    showOnAllPages: false,        
    onlyShowOn: ['/'], 
    disabledPages: ['/admin']     
  }
};

// Generate the encoded URL
const WA_LINK = `https://wa.me/${EZY_CONFIG.whatsapp.number}?text=${encodeURIComponent(EZY_CONFIG.whatsapp.message)}`;
const CALL_LINK = `tel:917039509783`;


const headerHTML = `
<nav class="main-nav">
  <div class="nav-container">
    <a href="/" class="logo-link">
      <div class="logo-flex-container">
        <div class="icon-side">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="white" />
            <path d="M16 10L21 21L16 19L11 21L16 10Z" fill="#764ba2"/>
          </svg>
        </div>
        <div class="text-side">
          <span class="brand-name">EzyGoDigi</span>
          <div class="tag-window">
            <div class="tag-track">
              <span>SEO Optimized</span>
              <span>Transparent Process</span>
              <span>Fast Solutions</span>
              <span>SEO Optimized</span>
            </div>
          </div>
        </div>
      </div>
    </a>

    <ul class="desktop-nav">
      <li><a href="/">Home</a></li>
      <li class="desktop-has-dropdown">
        <a href="javascript:void(0)">Services <small>▼</small></a>
        <ul class="desktop-sub-menu">
          <li><a href="website-design">Web Design</a></li>
          <li><a href="seo-tracking">SEO & GA4</a></li>
          <li><a href="ai-chatbot">AI Chatbot</a></li>
          <li><a href="privacy-first-analytics">Web Analytics</a></li>
        </ul>
      </li>
      <li><a href="website-cost-calculator">Cost Calculator</a></li>
      <li><a href="refer">Refer & Earn</a></li>
      <li><a href="pricing">Pricing</a></li>
      <li><a href="about">About Us</a></li>
      <li><a href="contact">Contact</a></li>
    </ul>

    <div class="header-actions">
      <div class="desktop-action-group">
        <a href="${CALL_LINK}" class="desktop-cta-btn call-btn" data-track-name="desktop_call_click">
          <svg viewBox="0 0 512 512" width="14" height="14"><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
          <span>CALL</span>
        </a>
        <a href="${WA_LINK}" class="desktop-cta-btn wa-btn" target="_blank" data-track-name="desktop_whatsapp_click">
          <svg viewBox="0 0 448 512" width="16" height="16"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          <span>CHAT</span>
        </a>
      </div>

      <div class="mobile-action-group">
        <a href="${CALL_LINK}" class="mobile-icon-btn call-color" data-track-name="mobile_call_click">
          <svg viewBox="0 0 512 512" width="18" height="18"><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
        </a>
        <a href="${WA_LINK}" class="mobile-icon-btn wa-color" target="_blank" data-track-name="mobile_whatsapp_click">
          <svg viewBox="0 0 448 512" width="18" height="18"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
        </a>
      </div>

      <button class="hamburger-btn" id="openBtn" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="side-drawer" id="sideDrawer">
      <ul class="nav-menu">
        <li><a href="/">Home</a></li>
        <li class="has-dropdown">
          <div class="dropdown-header" id="mobServices">
            <span>Services</span>
            <span class="toggle-indicator">+</span>
          </div>
          <ul class="mobile-sub-menu" id="mobSub">
            <li><a href="website-design">Web Design</a></li>
            <li><a href="seo-tracking">SEO & GA4</a></li>
            <li><a href="ai-chatbot">AI Chatbot</a></li>
            <li><a href="privacy-first-analytics">Web Analytics</a></li>
          </ul>
        </li>
        <li><a href="website-cost-calculator">Cost Calculator</a></li>
        <li><a href="refer">Refer & Earn</a></li>
        <li><a href="pricing">Pricing</a></li>
        <li><a href="about">About Us</a></li>
        <li><a href="contact">Contact</a></li>
        <li><a href="${WA_LINK}" class="drawer-cta" target="_blank">Chat on WhatsApp</a></li>
      </ul>
    </div>
  </div>
</nav>
`;

const footerHTML = `
<footer class="main-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <h4>🚀 EzyGoDigi</h4>
      <p>Professional digital services & privacy-first tools for small and growing businesses.</p>
      <div class="footer-social">
        <a href="https://www.linkedin.com/company/ezygodigi" target="_blank" aria-label="LinkedIn">
          <svg viewBox="0 0 448 512" width="24" height="24"><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>
        </a>
        <a href="https://www.instagram.com/ezygodigi" target="_blank" aria-label="Instagram">
          <svg viewBox="0 0 448 512" width="24" height="24"><path fill="currentColor" d="M224 168.3a87.7 87.7 0 1 0 0 175.4 87.7 87.7 0 0 0 0-175.4zm0 144.7a57 57 0 1 1 0-114 57 57 0 0 1 0 114zM336.5 135.5a17.5 17.5 0 1 0 0 35 17.5 17.5 0 0 0 0-35zM448 108.8v294.4c0 60.1-48.7 108.8-108.8 108.8H108.8C48.7 512 0 463.3 0 403.2V108.8C0 48.7 48.7 0 108.8 0h230.4C399.3 0 448 48.7 448 108.8zm-56 0c0-31.3-24.7-56-56-56H108.8c-31.3 0-56 24.7-56 56v294.4c0 31.3 24.7 56 56 56h230.4c31.3 0 56-24.7 56-56V108.8z"/></svg>
        </a>
      </div>
    </div>

    <div class="footer-nav">
      <h5>Core Services</h5>
      <a href="website-design">Website Design</a>
      <a href="ui-ux-design">UI / UX Design</a>
      <a href="graphics-design">Graphics & Branding</a>
      <a href="free-tools">Free Tools</a>
    </div>

    <div class="footer-nav">
      <h5>Industry Solutions</h5>
      <a href="ad-landing-pages">Ad Landing Pages</a>
      <a href="ecommerce-website">Ecommerce Websites</a>
      <a href="cloud-kitchen-website">Cloud Kitchen Websites</a>
      <a href="consultant-website">Consultant Websites</a>
      <a href="real-estate-website">Real Estate Websites</a>
    </div>

    <div class="footer-nav">
      <h5>Company</h5>
      <a href="about">About Us</a>
      <a href="pricing">Pricing</a>
      <a href="/blog">Blog</a>
      <a href="contact">Contact</a>
    </div>
  </div>

  <div class="footer-bottom">
    <span>© 2025 EzyGoDigi. All rights reserved.</span>
    <div class="footer-links">
      <a href="terms-conditions-scope-of-service">Terms · Scope of Service</a>
    </div>
  </div>
</footer>
`;

/* --- Consolidated Initialization Logic --- */
document.addEventListener("DOMContentLoaded", () => {
  const h = document.getElementById("header-placeholder");
  const f = document.getElementById("footer-placeholder");

  if (h) h.innerHTML = headerHTML;
  if (f) f.innerHTML = footerHTML;

  const openBtn = document.getElementById("openBtn");
  const drawer = document.getElementById("sideDrawer");
  const mobServices = document.getElementById("mobServices");
  const mobSub = document.getElementById("mobSub");

  // Drawer Toggle (The Hamburger acts as the only open/close controller)
  if (openBtn && drawer) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = drawer.classList.toggle("active");
      openBtn.classList.toggle("active"); // Animates Hamburger to X and back
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
  }

  // Sub-menu Logic
  if (mobServices && mobSub) {
    mobServices.addEventListener("click", (e) => {
      e.preventDefault(); 
      const isSubActive = mobSub.classList.toggle("active");
      const indicator = mobServices.querySelector('.toggle-indicator');
      if (indicator) {
        indicator.textContent = isSubActive ? "−" : "+";
      }
    });
  }

  // Auto-Close Logic on link click
  const drawerLinks = document.querySelectorAll(".nav-menu a:not(.dropdown-header)");
  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("active");
      openBtn.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
});

/* --- EzyGoDigi Bot Loader --- */
window.addEventListener("load", () => {
  let path = window.location.pathname;
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  
  const bot = EZY_CONFIG.bot;
  const normalize = (p) => (p.length > 1 && p.endsWith('/')) ? p.slice(0, -1) : p;

  const isExplicitlyDisabled = bot.disabledPages.some(p => {
    const normP = normalize(p);
    return normP === '/' ? path === '/' : path.startsWith(normP);
  });

  const isAllowedPath = bot.showOnAllPages || bot.onlyShowOn.some(p => {
    const normP = normalize(p);
    if (normP === '/') return path === '/';
    return path.startsWith(normP);
  });

  if (bot.enabled && !isExplicitlyDisabled && isAllowedPath) {
    setTimeout(() => {
      if (window.__EZY_LOADED__) return;
      window.__EZY_LOADED__ = true;
      window.EZY_BOT_CONFIG = { 
        bot: "ezygodigi", 
        token: "ezy-8xK29sPq", 
        title: "EzyGoDigi Support" 
      };
      const s = document.createElement("script");
      s.src = "https://ezygodigi.in/sdk/ezygodigi-chatbot-sdk.js";
      s.async = true;
      document.body.appendChild(s);
    }, 2000);
  }
});