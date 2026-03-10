/* =====================================================
   HEADER & FOOTER HTML (CLEAN DROPDOWN NAV)
===================================================== */


const headerHTML = `
<nav>
  <div class="nav-container">
    <a href="/" class="logo svg-logo" aria-label="EzyGoDigi Home">
      <svg width="220" height="65" viewBox="0 0 260 80" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#7c8cff"/>
            <stop offset="100%" stop-color="#9b6cff"/>
          </linearGradient>
        </defs>
        <circle cx="28" cy="28" r="22" fill="url(#grad)"/>
        <path d="M28 14 L36 30 L28 26 L20 30 Z" fill="#fff"/>
        <text x="62" y="36" font-family="Poppins, Arial, sans-serif" font-size="28" font-weight="700" fill="#ffffff">EzyGoDigi</text>
        <text class="tagline-anim" x="62" y="62" font-family="Poppins, Arial, sans-serif" font-size="14" font-weight="400" fill="#ffffff" letter-spacing="0.5"></text>
      </svg>
    </a>

    <ul class="nav-links" id="navLinks">
      <li><a href="/">Home</a></li>
      
      <!-- SERVICES DROPDOWN -->
      <li class="dropdown">
        <a href="services" class="dropdown-toggle">Services <i class="fas fa-chevron-down"></i></a>
        <ul class="dropdown-menu">
          <li><a href="website-design">Website Design</a></li>
			<li><a href="privacy-first-analytics">Analytics</a></li>
			<li><a href="ai-chatbot">AI Chatbot</a></li>
          <li><a href="ui-ux-design">UI/UX Design</a></li>
          <li><a href="graphics-design">Graphics & Branding</a></li>
		  <li><a href="seo-tracking">SEO Tracking</a></li>
          <li><a href="pricing">View All Pricing</a></li>
        </ul>
      </li>
      <li><a href="website-cost-calculator">💰 Cost Calculator</a></li>
      <li><a href="pricing">Pricing</a></li>
    </ul>

    <button class="mobile-menu-btn" onclick="toggleMenu()">☰</button>
  </div>
</nav>
`;

const footerHTML = `
<footer>
  <div class="footer-content">
    <div>
      <h3>🚀 EzyGoDigi</h3>
      <p>Professional digital services & privacy-first tools for small and growing businesses.</p>
<!-- SOCIAL ICONS (INLINE SVG) -->
<div class="footer-social">
  <a href="https://www.linkedin.com/company/ezygodigi" target="_blank" aria-label="LinkedIn">
    <!-- LinkedIn -->
    <svg viewBox="0 0 448 512" aria-hidden="true">
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
    </svg>
  </a>

<a href="https://www.instagram.com/ezygodigi" target="_blank" aria-label="Instagram">
  <!-- Instagram (FIXED FULL ICON) -->
  <svg viewBox="0 0 448 512" aria-hidden="true">
    <!-- Outer rounded square -->
    <path d="M224 98.7c35.7 0 39.9.1 54 .8
      13 .6 20.1 2.8 24.8 4.6
      6.3 2.4 10.8 5.3 15.5 10
      4.7 4.7 7.6 9.2 10 15.5
      1.8 4.7 4 11.8 4.6 24.8
      .7 14.1.8 18.3.8 54s-.1 39.9-.8 54
      c-.6 13-2.8 20.1-4.6 24.8
      -2.4 6.3-5.3 10.8-10 15.5
      -4.7 4.7-9.2 7.6-15.5 10
      -4.7 1.8-11.8 4-24.8 4.6
      -14.1.7-18.3.8-54 .8s-39.9-.1-54-.8
      c-13-.6-20.1-2.8-24.8-4.6
      -6.3-2.4-10.8-5.3-15.5-10
      -4.7-4.7-7.6-9.2-10-15.5
      -1.8-4.7-4-11.8-4.6-24.8
      -.7-14.1-.8-18.3-.8-54s.1-39.9.8-54
      c.6-13 2.8-20.1 4.6-24.8
      2.4-6.3 5.3-10.8 10-15.5
      4.7-4.7 9.2-7.6 15.5-10
      4.7-1.8 11.8-4 24.8-4.6
      14.1-.7 18.3-.8 54-.8
      M224 48C148.3 48 139.1 48.3 122.7 49
      c-16.5.8-27.8 3.4-37.6 7.2
      -10.2 4-18.8 9.3-27.4 17.9
      -8.6 8.6-13.9 17.2-17.9 27.4
      -3.8 9.8-6.4 21.1-7.2 37.6
      -.7 16.4-1 25.6-1 101.3s.3 84.9 1 101.3
      c.8 16.5 3.4 27.8 7.2 37.6
      4 10.2 9.3 18.8 17.9 27.4
      8.6 8.6 17.2 13.9 27.4 17.9
      9.8 3.8 21.1 6.4 37.6 7.2
      16.4.7 25.6 1 101.3 1s84.9-.3 101.3-1
      c16.5-.8 27.8-3.4 37.6-7.2
      10.2-4 18.8-9.3 27.4-17.9
      8.6-8.6 13.9-17.2 17.9-27.4
      3.8-9.8 6.4-21.1 7.2-37.6
      .7-16.4 1-25.6 1-101.3s-.3-84.9-1-101.3
      c-.8-16.5-3.4-27.8-7.2-37.6
      -4-10.2-9.3-18.8-17.9-27.4
      -8.6-8.6-17.2-13.9-27.4-17.9
      -9.8-3.8-21.1-6.4-37.6-7.2
      C308.9 48.3 299.7 48 224 48z"/>
    <!-- Inner camera circle -->
    <path d="M224 168.3a87.7 87.7 0 1 0 0 175.4
      87.7 87.7 0 0 0 0-175.4zm0 144.7
      a57 57 0 1 1 0-114
      57 57 0 0 1 0 114z"/>
    <!-- Small top-right dot -->
    <circle cx="336.5" cy="135.5" r="17.5"/>
  </svg>
</a>



  <a href="https://www.facebook.com/ezygodigi" target="_blank" aria-label="Facebook">
    <!-- Facebook -->
    <svg viewBox="0 0 320 512" aria-hidden="true">
      <path d="M279.14 288l14.22-92.66h-88.91V117.78c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.2V288z"/>
    </svg>
  </a>
</div>


    </div>
    <div>
      <h3>Core Services</h3>
      <ul>
        <li><a href="website-design">Website Design</a></li>
        <li><a href="ui-ux-design">UI / UX Design</a></li>
        <li><a href="graphics-design">Graphics & Branding</a></li>
        <li><a href="free-tools">Free Tools</a></li>
      </ul>
    </div>
    <div>
      <h3>Industry Solutions</h3>
      <ul>
	    <li><a href="ecommerce-website">Ecommerce Websites</a></li>
        <li><a href="cloud-kitchen-website">Cloud Kitchen Websites</a></li>
        <li><a href="consultant-website">Consultant Websites</a></li>
        <li><a href="real-estate-website">Real Estate Websites</a></li>
        <li><a href="ad-landing-pages">Ad Landing Pages</a></li>
      </ul>
    </div>
    <div>
      <h3>Company</h3>
      <ul>
        <li><a href="about">About Us</a></li>
		<li><a href="refer">Refer & Grow</a></li>
        <li><a href="pricing">Pricing</a></li>
		<li><a href="faq">FAQ's</a></li>
		<li><a href="/blog">Blog</a></li>
        <li><a href="contact">Contact</a></li>
      </ul>
    </div>
  </div>

<div class="footer-bottom">
  <span>© 2025 EzyGoDigi. All rights reserved.</span>
  <span class="footer-links">
    <a href="terms-conditions-scope-of-service">Terms · Scope of Service</a>
  </span>
</div>

</footer>
`;


/* =====================================================
   ALL EXISTING FUNCTIONS (UNCHANGED)
===================================================== */
/*(function initLayout() {
  const header = document.getElementById("header-placeholder");
  const footer = document.getElementById("footer-placeholder");

  if (header) header.innerHTML = headerHTML;
  if (footer) footer.innerHTML = footerHTML;

  setActiveNav();
  buildBreadcrumb();
})();*/

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header-placeholder");
  const footer = document.getElementById("footer-placeholder");

  if (header) header.innerHTML = headerHTML;
  if (footer) footer.innerHTML = footerHTML;

  setActiveNav();
  buildBreadcrumb();
});


function setActiveNav() {
  // e.g. "/services" → "services"
  let currentPage = window.location.pathname.split("/").filter(Boolean).pop() || "";

  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");

    // normalize: remove leading "/" and trailing "/"
    const normalizedHref = href.replace(/^\//, "").replace(/\/$/, "");
    const normalizedPage = currentPage.replace(/^\//, "").replace(/\/$/, "");

    if (normalizedHref === normalizedPage || (normalizedHref === "" && normalizedPage === "")) {
      link.classList.add("active");
    }
  });
}


function buildBreadcrumb() {
  const container = document.getElementById("breadcrumb-placeholder");
  if (!container) return;

  // e.g. "/" → "" (Home), "/services" → "services"
  let page = window.location.pathname.split("/").filter(Boolean).pop() || "";

  const labels = {
    "": "Home",
    "services": "Services",
    "pricing": "Pricing",
    "about": "About",
    "contact": "Contact"
  };

  container.innerHTML = `
    <div class="breadcrumb-wrap">
      <nav class="breadcrumb">
        <a href="/">Home</a>
        ${page ? `<span class="sep">›</span><span class="current">${labels[page] || page}</span>` : ""}
      </nav>
    </div>
  `;
}


function toggleMenu() {
  document.getElementById("navLinks")?.classList.toggle("active");
}

document.addEventListener("click", e => {
  const nav = document.querySelector("nav");
  const navLinks = document.getElementById("navLinks");
  if (nav && navLinks && !nav.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

function injectStickyCTA() {
  if (document.querySelector(".sticky-actions"))
  
  return;

  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="sticky-actions">
      <a href="contact" class="sticky-cta">
        💬 <span>Get in Touch</span>
      </a>
      <button class="scroll-top" id="scrollTopBtn">↑</button>
    </div>
  `;
  document.body.appendChild(wrap);

  const scrollBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("load", () => {
  setTimeout(injectStickyCTA, 1200);
});


(function attachContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) {
    setTimeout(attachContactForm, 300);
    return;
  }

  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      business: form.business?.value || null,
      service: form.service?.value || null,
      budget: form.budget?.value || null,
      message: form.message.value.trim(),
      company_name: form.company_name?.value || "",
      source: "contact_page"
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error();

      showFormToast();
      form.reset();

    } catch {
      alert("Something went wrong. Please try again.");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message →";
  });
})();

function showFormToast() {
  const toast = document.getElementById("formToast");
  if (!toast) return;

  toast.classList.add("show");

  toast.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

function initTaglineTyping() {
  const tagline = document.querySelector('.tagline-anim');
  if (!tagline || tagline.textContent.trim()) return;
  
  const text = 'Go Digital in 1 Day';
  let i = 0;
  
  function type() {
    if (i < text.length) {
      tagline.textContent += text[i];
      i++;
      setTimeout(type, 100);
    }
  }
  
  setTimeout(type, 600);
}

if (document.querySelector('.tagline-anim')) {
  if ('requestIdleCallback' in window) {
  requestIdleCallback(initTaglineTyping);
} else {
  setTimeout(initTaglineTyping, 800);
}

} else {
  setTimeout(initTaglineTyping, 150);
}

/* =====================================================
   CHATBOT SDK LOADER (GLOBAL)
===================================================== */
window.addEventListener("load", () => {
  setTimeout(() => {
    if (window.__EZYGODIGI_CHAT_LOADED__) return;
    window.__EZYGODIGI_CHAT_LOADED__ = true;

    window.EZY_BOT_CONFIG = {
      bot: "ezygodigi",
      token: "ezy-8xK29sPq",
      title: "EzyGoDigi Support",
      welcomeMessage: "Hi 👋 How can I help you today?"
    };

    const s = document.createElement("script");
    s.src = "https://ezygodigi.in/sdk/ezygodigi-chatbot-sdk.js";
    s.async = true;
    document.body.appendChild(s);
  }, 3000);
});


/* ======================================================
   GOOGLE ADS POPUP – MOBILE FIRST (3 CTA)
   ====================================================== */

function showAdsPopup() {

  /* 🔴 MASTER KILL SWITCH */
  const POPUP_ENABLED = false;
  if (!POPUP_ENABLED) return;

  if (
    location.search.includes('popup=off') ||
    ['checkout','payment','thank-you','admin'].some(p => 
      location.pathname.includes(p)
    ) ||
    localStorage.getItem('ads_popup_closed')
  ) return;

  document.getElementById('ads-popup')?.remove();

  const popup = document.createElement('div');
  popup.id = 'ads-popup';

  popup.innerHTML = `
  <style>
    #ads-popup {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 10050;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .ads-card {
      background: linear-gradient(135deg, #ff6b6b, #feca57);
      width: 92vw;
      max-width: 420px;
      margin: 14px;
      border-radius: 22px;
      padding: 18px 16px 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.35);
      position: relative;
      animation: slideUp .35s ease;
    }

    .ads-close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: none;
      background: #fff;
      color: #dc2626;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,.25);
    }

    .ads-title {
      color: #fff;
      font-size: 22px;
      font-weight: 900;
      margin-bottom: 4px;
      line-height: 1.2;
      text-shadow: 0 2px 6px rgba(0,0,0,.3);
    }

    .ads-title sup { font-size: 12px; }

    .ads-sub {
      color: #fff;
      font-size: 14.5px;
      opacity: .95;
      margin-bottom: 6px;
    }

    .ads-note {
      color: #fff;
      font-size: 11.5px;
      opacity: .9;
      margin-bottom: 12px;
    }

    .ads-points {
      color: #fff;
      font-size: 13px;
      opacity: .95;
      margin-bottom: 14px;
    }

    .ads-points span { display: block; margin-bottom: 4px; }

    .ads-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 12px;
    }

    .ads-btn {
      flex: 1;
      padding: 14px;
      border-radius: 30px;
      font-weight: 800;
      font-size: 14.5px;
      text-align: center;
      text-decoration: none;
      border: 2px solid #fff;
    }

    .ads-primary { background: #fff; color: #ff6b6b; }
    .ads-secondary { background: rgba(255,255,255,0.2); color: #fff; }

    /* 🤖 AI CHATBOT LOOKING CTA */
    .ai-chat {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: rgba(255,255,255,0.25);
      border: 2px dashed rgba(255,255,255,0.8);
      color: #fff;
      padding: 12px;
      border-radius: 14px;
      font-weight: 800;
      font-size: 14px;
      text-decoration: none;
    }

    .ai-dot {
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 8px #22c55e;
    }

    @keyframes slideUp {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (min-width: 768px) {
      #ads-popup { align-items: center; }
    }
  </style>

  <div class="ads-card">
    <button class="ads-close">✕</button>

    <div class="ads-title">
      Website @ ₹2,999<sup>*</sup>
    </div>

    <div class="ads-sub">FREE Chatbot Included</div>
    <div class="ads-note">*Introductory price. Limited time offer.</div>

    <div class="ads-points">
      <span>✔ SEO-Ready & Mobile-First</span>
      <span>✔ Launch in 24 Hours</span>
    </div>

    <div class="ads-actions">
      <a href="/contact" class="ads-btn ads-primary">Get Started</a>
      <a href="/website-cost-calculator" class="ads-btn ads-secondary">Cost Estimator</a>
    </div>

    <!-- 🤖 AI CHATBOT LOOKING LINK -->
    <a href="/ai-chatbot" class="ai-chat">
      <span class="ai-dot"></span>
      Explore AI Chatbot
    </a>
  </div>
  `;

  document.body.appendChild(popup);

  popup.querySelector('.ads-close').onclick = () => {
    localStorage.setItem('ads_popup_closed', '1');
    popup.remove();
  };

  popup.onclick = (e) => {
    if (e.target === popup) popup.querySelector('.ads-close').click();
  };
}

/* ⏱ SHOW AFTER PAGE LOAD */
window.addEventListener("load", () => {
  setTimeout(showAdsPopup, 1200);
});


//--------------------------------------//
// Blog page helpful //
//-------------------------------------//

//--------------------------------------//
// Blog page helpful (SAFE & REUSABLE)
//--------------------------------------//
(function initBlogHelpful() {
  const box = document.querySelector(".helpful-box");
  if (!box) return; // ✅ Do nothing if not a blog page

  const postId = box.dataset.postId;
  if (!postId) return;

  // Load counts
  fetch(`/api/helpful?post_id=${postId}`)
    .then(r => r.json())
    .then(d => {
      const yesEl = document.getElementById("helpful-yes");
      const noEl = document.getElementById("helpful-no");

      if (yesEl) yesEl.innerText = d.yes_count || 0;
      if (noEl) noEl.innerText = d.no_count || 0;
    });

  // Handle votes
  box.querySelectorAll(".helpful-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      fetch("/api/helpful", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_id: postId,
          value: btn.dataset.value
        })
      });

      const msg = document.getElementById("helpful-msg");
      if (msg) msg.innerText = "Thanks for your feedback!";

      // Optional: prevent multiple clicks
      box.querySelectorAll(".helpful-btn").forEach(b => b.disabled = true);
    });
  });
})();