(function () {
  const BOT_CONFIG = window.EZY_BOT_CONFIG || {};
  const CONFIG = {
    apiUrl: BOT_CONFIG.apiUrl || "https://ezygodigi-bot-api.pankajbecs07.workers.dev",
    bot: BOT_CONFIG.bot,
    token: BOT_CONFIG.token,
    title: BOT_CONFIG.title || "Support",
    welcomeMessage: BOT_CONFIG.welcomeMessage || "Hi 👋 How can I help you today?"
  };

  if (!CONFIG.bot || !CONFIG.token) {
    console.warn("EzyGoDigi Chatbot: Missing bot or token");
    return;
  }

  function getSessionId() {
    let sid = sessionStorage.getItem("eg_session_id");
    if (!sid) {
      sid = "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2);
      sessionStorage.setItem("eg_session_id", sid);
    }
    return sid;
  }

  /* ================= UI ================= */
  const style = document.createElement("style");
  style.innerHTML = `
/* ================= CHAT BUBBLE ================= */
#eg-chat-btn{
  position:fixed;
  bottom:20px;
  right:20px;
  width:56px;
  height:56px;
  border-radius:50%;
  background: linear-gradient(135deg, #e5e7eb, #cbd5e1);
  color: #374151;
  box-shadow: 0 10px 24px rgba(0,0,0,.25);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  font-size:22px;
  z-index:9999;
  box-shadow:0 12px 28px rgba(79,172,254,.45);
  transition:transform .25s ease, box-shadow .25s ease;
}
#eg-chat-btn:hover{
  transform:translateY(-3px) scale(1.04);
  box-shadow:0 18px 40px rgba(79,172,254,.6);
}

/* ================= CHAT BOX ================= */
#eg-chat-box{
  position:fixed;
  bottom:90px;
  right:20px;
  width:340px;
  height:460px;
  background:#fff;
  border-radius:14px;
  box-shadow:0 20px 50px rgba(0,0,0,.25);
  display:none;
  flex-direction:column;
  z-index:9999;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  overflow:hidden;
}

/* ================= HEADER ================= */
#eg-chat-header{
  background:linear-gradient(135deg,#667eea,#764ba2);
  color:#fff;
  padding:12px 14px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  font-size:14px;
  font-weight:600;
}
.eg-header-actions{ display:flex; gap:8px; }
.eg-contact-btn{
  background:#fff;
  color:#667eea;
  font-size:12px;
  font-weight:600;
  padding:6px 10px;
  border-radius:999px;
  text-decoration:none;
}

/* ================= MESSAGES ================= */
#eg-chat-messages{
  flex:1;
  padding:12px;
  overflow-y:auto;
  font-size:13px;
  background:#f9fafb;
}
.eg-msg{
  max-width:80%;
  margin-bottom:10px;
  padding:8px 12px;
  border-radius:12px;
  line-height:1.5;
}
.eg-user{
  margin-left:auto;
  background:#667eea;
  color:#fff;
  border-bottom-right-radius:4px;
}
.eg-bot{
  background:#fff;
  color:#333;
  box-shadow:0 4px 10px rgba(0,0,0,.06);
  border-bottom-left-radius:4px;
}

/* ================= INPUT ================= */
#eg-chat-input{
  display:flex;
  border-top:1px solid #eee;
  padding:8px;
  gap:8px;
  background:#fff;
}
#eg-chat-input input{
  flex:1;
  border:1px solid #ddd;
  border-radius:999px;
  padding:8px 12px;
  font-size:13px;
  outline:none;
}
#eg-chat-input button{
  background:linear-gradient(135deg,#667eea,#764ba2);
  color:#fff;
  border:none;
  padding:0 16px;
  border-radius:999px;
  cursor:pointer;
  font-size:13px;
  font-weight:600;
}

/* Mobile */
@media(max-width:480px){
  #eg-chat-box{
    width:92vw;
    right:4vw;
    bottom:90px;
  }
}

/* Animations */
#eg-chat-btn { transition: transform .25s ease, box-shadow .25s ease, background .25s ease; }
#eg-chat-btn:active { transform: scale(.95); }
@keyframes eg-blink { 0%,96%,100%{transform:scaleY(1);} 97%,99%{transform:scaleY(0.1);} }
.eye { transform-origin:center; animation:eg-blink 6s infinite; }
@keyframes eg-breathe {
  0%{transform:scale(1);box-shadow:0 10px 24px rgba(0,0,0,.22);}
  50%{transform:scale(1.04);box-shadow:0 14px 32px rgba(0,0,0,.28);}
  100%{transform:scale(1);box-shadow:0 10px 24px rgba(0,0,0,.22);}
}
#eg-chat-btn.idle { animation:eg-breathe 3.2s ease-in-out infinite; }
#eg-chat-btn svg { display:block; }

/* ===== BULLETS → CHIPS, BUTTONS (FINAL THEME) ===== */
.price-chip {
  display: inline-block;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  padding: 6px 12px;
  margin: 4px 6px 4px 0;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.3;
  box-shadow: 0 2px 8px rgba(16,185,129,0.25);
  text-align: left;
}
.price-highlight {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 11px;
}

.super-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 12px 0;
  padding: 12px 8px;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-radius: 16px;
  border-left: 4px solid #3b82f6;
}

.super-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff !important;
  border: none;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(37,99,235,0.25);
  transition: all 0.2s;
  flex: 1;
  min-width: 140px;
  max-width: 200px;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  white-space: normal;
  overflow: hidden;
}
.super-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(37,99,235,0.35);
}

/* MOBILE - FULL WIDTH BUTTONS */
@media(max-width:480px){
  .super-btn {
    min-width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
  }
  .super-row {
    padding: 10px 6px;
    gap: 4px;
  }
}
  `;
  document.head.appendChild(style);

  const btn = document.createElement("div");
  btn.id = "eg-chat-btn";
  btn.innerHTML = `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="5" width="18" height="14" rx="7" fill="currentColor"/>
  <circle class="eye" cx="9" cy="12" r="1.8" fill="#fff"/>
  <circle class="eye" cx="15" cy="12" r="1.8" fill="#fff"/>
</svg>`;

  const box = document.createElement("div");
  box.id = "eg-chat-box";
  box.innerHTML = `
  <div id="eg-chat-header">
    <span>${CONFIG.title}</span>
    <a href="/contact" class="eg-contact-btn">Contact Us</a>
  </div>
  <div id="eg-chat-messages"></div>
  <div id="eg-chat-input">
    <input type="text" placeholder="Type a message..." />
    <button>Send</button>
  </div>`;

  function openChat() { box.style.display = "flex"; btn.innerHTML = "✕"; }
  function closeChat() { 
    box.style.display = "none"; 
    btn.innerHTML = `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="5" width="18" height="14" rx="7" fill="currentColor"/>
  <circle class="eye" cx="9" cy="12" r="1.8" fill="#fff"/>
  <circle class="eye" cx="15" cy="12" r="1.8" fill="#fff"/>
</svg>`;
  }

  document.body.appendChild(btn);
  document.body.appendChild(box);

  const messages = box.querySelector("#eg-chat-messages");
  const input = box.querySelector("input");
  const sendBtn = box.querySelector("button");

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function bindPasteButtons(msgDiv) {
    msgDiv.querySelectorAll('.super-btn').forEach(btn => {
      btn.onclick = () => {
        input.value = btn.dataset.text;
        input.focus();
        sendBtn.click();
      };
      btn.title = btn.dataset.text;
    });
  }

  function addMessage(text, cls) {
    const d = document.createElement("div");
    d.className = `eg-msg ${cls}`;
    
    // Rich parsing for pricing / chatbot / ask blocks
    if (text.includes('₹') || text.includes('chatbot') || text.match(/ask[:\s]/i)) {
      d.innerHTML = parsePricingMessage(text);
    } else {
      d.innerHTML = escapeHtml(text);
    }
    
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
    bindPasteButtons(d);
  }

  function parsePricingMessage(text) {
    let html = escapeHtml(text);
    
    // Basic paragraph formatting for headings
    html = html
      .replace(/Starting prices:/i, '<br><br><strong>Starting prices:</strong>')
      .replace(/Pricing changes based on:/i, '<br><br><strong>Pricing changes based on:</strong>');

    // Bullets → chips
    html = html.replace(/•\s*([^•\n]{10,})(?:\s*[––-]\s*₹?([\d,]+))?/gi,
      (match, desc, price) => {
        let chip = `<span class="price-chip">${desc.trim()}`;
        if (price) chip += ` <span class="price-highlight">₹${price}</span>`;
        return chip + '</span>';
      }
    );

    // Quoted questions → buttons
    const questions = (text.match(/"([^"]+)"/g) || [])
      .map(q => q.slice(1, -1).trim())
      .filter(q => q.length > 5);

    if (questions.length > 0) {
      const btnHtml = questions.slice(0,4).map(q =>
        `<button class="super-btn" data-text="${escapeHtml(q)}" title="${escapeHtml(q)}">${q}</button>`
      ).join('');
      html = html.replace(/👉[\s\S]*?(?=\n\n|\n$|•"|$)/i, `<div class="super-row">${btnHtml}</div>`);
    }

    // Standalone prices
    html = html.replace(/₹([\d,]+)/g, '<span class="price-highlight">₹$1</span>');

    return html;
  }

  btn.onclick = async () => {
    if (box.style.display === "flex") {
      closeChat();
      return;
    }
    openChat();
    if (messages.innerHTML) return;

    const res = await fetch(CONFIG.apiUrl + "/session/init", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Bot-Token": CONFIG.token },
      body: JSON.stringify({
        bot: CONFIG.bot,
        session_id: getSessionId(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        page: location.pathname
      })
    });

    const flow = await res.json();
    addMessage(CONFIG.welcomeMessage, "eg-bot");

    if (flow.onboarding_enabled) {
      sessionStorage.setItem("eg_flow", "ask_name");
      addMessage("What's your name? (type skip)", "eg-bot");
    }
  };

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "eg-user");
    input.value = "";

    const flow = sessionStorage.getItem("eg_flow");
    const sid = getSessionId();

    if (flow === "ask_name") {
      if (text.toLowerCase() !== "skip") sessionStorage.setItem("eg_name", text);
      sessionStorage.setItem("eg_flow", "ask_phone");
      addMessage("Can I have your phone number? (optional, type skip)", "eg-bot");
      return;
    }

    if (flow === "ask_phone") {
      if (text.toLowerCase() !== "skip") sessionStorage.setItem("eg_phone", text);
      
      await fetch(CONFIG.apiUrl + "/session/save", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Bot-Token": CONFIG.token },
        body: JSON.stringify({
          bot: CONFIG.bot,
          session_id: sid,
          name: sessionStorage.getItem("eg_name"),
          phone: sessionStorage.getItem("eg_phone")
        })
      });
      sessionStorage.removeItem("eg_flow");
      addMessage("Thanks 😊 How can I help you now?", "eg-bot");
      return;
    }

    try {
      const res = await fetch(CONFIG.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Bot-Token": CONFIG.token },
        body: JSON.stringify({ bot: CONFIG.bot, message: text, session_id: sid })
      });
      const data = await res.json();
      addMessage(data.reply || "Something went wrong.", "eg-bot");
    } catch {
      addMessage("⚠️ Network error.", "eg-bot");
    }
  }

  sendBtn.onclick = sendMessage;
  input.addEventListener("keypress", e => e.key === "Enter" && sendMessage());
})();
