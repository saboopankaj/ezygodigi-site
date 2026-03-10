(function () {
  const BOT_CONFIG = window.EZY_BOT_CONFIG || {};
  const CONFIG = {
    apiUrl: BOT_CONFIG.apiUrl || "https://ezygodigi-bot-api.pankajbecs07.workers.dev",
    bot: BOT_CONFIG.bot,
    token: BOT_CONFIG.token,
    title: BOT_CONFIG.title || "Support Assistant",
    welcomeMessage: BOT_CONFIG.welcomeMessage || "Hi 👋 How can I help you today?"
  };

  if (!CONFIG.bot || !CONFIG.token) return;

  function getSessionId() {
    let sid = sessionStorage.getItem("eg_session_id");
    if (!sid) {
      sid = "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2);
      sessionStorage.setItem("eg_session_id", sid);
    }
    return sid;
  }

  /* ================= MODERN UI STYLES ================= */
  const style = document.createElement("style");
  style.innerHTML = `
    #eg-chat-btn { 
      position:fixed; bottom:20px; right:20px; width:60px; height:60px; 
      border-radius:50%; background: linear-gradient(135deg, #667eea, #764ba2); 
      color: #fff; display:flex; align-items:center; justify-content:center; 
      cursor:pointer; z-index:9999; box-shadow:0 10px 25px rgba(102,126,234,0.4); 
      transition:all 0.3s ease; 
    }
    #eg-chat-btn:hover { transform: scale(1.05); }
    
    /* The Round Notification Badge ON the Icon */
    .eg-badge {
      position: absolute; top: 2px; right: 2px;
      width: 14px; height: 14px; background: #ff4d4f;
      border: 2px solid #fff; border-radius: 50%;
      animation: egPulse 2s infinite;
      z-index: 10000;
    }

    @keyframes egPulse {
      0% { box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(255, 77, 79, 0); }
      100% { box-shadow: 0 0 0 0 rgba(255, 77, 79, 0); }
    }

    #eg-chat-box { position:fixed; bottom:95px; right:20px; width:360px; height:550px; background:#fff; border-radius:20px; box-shadow:0 15px 40px rgba(0,0,0,0.15); display:none; flex-direction:column; z-index:9999; font-family: 'Inter', -apple-system, sans-serif; overflow:hidden; border: 1px solid rgba(0,0,0,0.05); }
    #eg-chat-header { background:linear-gradient(135deg,#667eea,#764ba2); color:#fff; padding:16px 20px; display:flex; align-items:center; justify-content:space-between; font-size:16px; font-weight:600; }
    #eg-chat-messages { flex:1; padding:20px; overflow-y:auto; background:#fcfdfe; display:flex; flex-direction:column; gap: 10px; }
    
    .eg-msg { max-width:85%; padding:12px 16px; border-radius:18px; line-height:1.5; font-size:14px; white-space: pre-wrap; word-wrap: break-word; animation: egSlideUp 0.3s ease; }
    @keyframes egSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    
    .eg-user { margin-left:auto; background:#667eea; color:#fff; border-bottom-right-radius:4px; box-shadow: 0 4px 12px rgba(102,126,234,0.2); }
    .eg-bot { background:#f1f5f9; color:#1e293b; border-bottom-left-radius:4px; align-self: flex-start; }
    
    .price-chip { display: inline-block; background: #dcfce7; color: #166534; padding: 5px 12px; margin: 5px 5px 0 0; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1px solid #bbf7d0; }
    .price-hl { background: #fef3c7; color: #92400e; padding: 2px 4px; border-radius: 4px; font-weight: 700; }
    
    .typing { display: flex; gap: 4px; padding: 12px 18px !important; width: fit-content; }
    .dot { width: 6px; height: 6px; background: #cbd5e1; border-radius: 50%; animation: dot-pulse 1.5s infinite; }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes dot-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
    
    #eg-qr-area { display: flex; flex-wrap: wrap; gap: 8px; padding: 10px 20px; background: #fff; border-top: 1px solid #f1f5f9; }
    .qr-btn { background: #fff; border: 1.5px solid #667eea; color: #667eea; padding: 8px 14px; border-radius: 20px; font-size: 12px; cursor: pointer; transition: 0.2s; font-weight: 600; }
    .qr-btn:hover { background: #667eea; color: #fff; }
    
    #eg-input-form { display:flex; border-top: 1px solid #f1f5f9; padding:15px; gap:10px; background:#fff; }
    #eg-input-form input { flex:1; border: 1.5px solid #e2e8f0; border-radius:25px; padding:10px 18px; font-size:14px; outline:none; }
    #eg-input-form button { background:#667eea; color:#fff; border:none; width: 40px; height: 40px; border-radius:50%; cursor:pointer; display: flex; align-items: center; justify-content: center; }

    @media(max-width:480px){ 
      #eg-chat-box { width:100vw; height:100vh; right:0; bottom:0; border-radius:0; } 
    }
  `;
  document.head.appendChild(style);

  function parseContent(text) {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/₹([\d,]+)/g, '<span class="price-hl">₹$1</span>');

    const lines = html.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('•')) {
        return `<span class="price-chip">${trimmed.substring(1).trim()}</span>`;
      }
      return line;
    });
    html = processedLines.join('\n');

    const qrMatch = html.match(/\[QR:\s*(.*?)\]/);
    let options = [];
    if (qrMatch) {
      options = qrMatch[1].split(',').map(s => s.trim());
      html = html.replace(qrMatch[0], '').trim();
    }
    
    const quotes = (text.match(/"([^"]+)"/g) || []).map(q => q.slice(1, -1));
    if (quotes.length > 0 && options.length === 0) options = quotes.slice(0, 4);

    return { html, options };
  }

  const btn = document.createElement("div");
  btn.id = "eg-chat-btn";
  // Added the badge div inside the button
  btn.innerHTML = `
    <div class="eg-badge" id="eg-notif-dot"></div>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;

  const box = document.createElement("div");
  box.id = "eg-chat-box";
  box.innerHTML = `
    <div id="eg-chat-header"><span>${CONFIG.title}</span><span style="cursor:pointer" id="eg-close-header">✕</span></div>
    <div id="eg-chat-messages"></div>
    <div id="eg-qr-area" style="display:none"></div>
    <form id="eg-input-form"><input type="text" placeholder="Type a message..." autocomplete="off" /><button type="submit"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button></form>`;

  document.body.appendChild(btn);
  document.body.appendChild(box);

  const msgsDiv = box.querySelector("#eg-chat-messages");
  const qrArea = box.querySelector("#eg-qr-area");
  const inputEl = box.querySelector("input");

  function showTyping() {
    const t = document.createElement("div");
    t.id = "eg-typing";
    t.className = "eg-msg eg-bot typing";
    t.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
    msgsDiv.appendChild(t);
    msgsDiv.scrollTop = msgsDiv.scrollHeight;
  }

  function addMessage(text, side) {
    const typing = document.getElementById("eg-typing");
    if (typing) typing.remove();
    qrArea.innerHTML = "";
    qrArea.style.display = "none";
    if (!text) return;

    const { html, options } = parseContent(text);
    const d = document.createElement("div");
    d.className = `eg-msg eg-${side}`;
    d.innerHTML = html;
    msgsDiv.appendChild(d);
    msgsDiv.scrollTop = msgsDiv.scrollHeight;

    if (side === "bot" && options.length > 0) {
      qrArea.style.display = "flex";
      options.forEach(opt => {
        const b = document.createElement("button");
        b.className = "qr-btn";
        b.innerText = opt;
        b.onclick = () => { inputEl.value = opt; box.querySelector("form").dispatchEvent(new Event('submit')); };
        qrArea.appendChild(b);
      });
    }
  }

  async function handleSend(e) {
    if (e) e.preventDefault();
    const val = inputEl.value.trim();
    if (!val) return;
    addMessage(val, "user");
    inputEl.value = "";

    const flow = sessionStorage.getItem("eg_flow");
    const sid = getSessionId();

    if (flow === "ask_name") {
      sessionStorage.setItem("eg_name", val);
      sessionStorage.setItem("eg_flow", "ask_phone");
      addMessage("Got it! And what is your phone number?", "bot");
      return;
    }
    
    if (flow === "ask_phone") {
      sessionStorage.setItem("eg_phone", val);
      sessionStorage.removeItem("eg_flow");
      
      fetch(CONFIG.apiUrl + "/session/save", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Bot-Token": CONFIG.token },
        body: JSON.stringify({ 
          bot: CONFIG.bot, 
          session_id: sid, 
          name: sessionStorage.getItem("eg_name"), 
          phone: val 
        })
      });

      addMessage("Thanks! How can I help you today?", "bot");
      return;
    }

    showTyping();
    try {
      const res = await fetch(CONFIG.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Bot-Token": CONFIG.token },
        body: JSON.stringify({ 
          bot: CONFIG.bot, 
          message: val, 
          session_id: sid,
          page: window.location.pathname 
        })
      });
      const data = await res.json();
      addMessage(data.reply || "Something went wrong.", "bot");
    } catch { addMessage("Connection error.", "bot"); }
  }

  btn.onclick = async () => {
    const isVisible = box.style.display === "flex";
    box.style.display = isVisible ? "none" : "flex";
    
    // Remove the notification dot once chat is opened for the first time
    const dot = document.getElementById("eg-notif-dot");
    if (dot) dot.remove();

    btn.innerHTML = isVisible 
      ? `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>` 
      : "✕";

    if (!isVisible && msgsDiv.innerHTML === "") {
      showTyping();
      try {
        const res = await fetch(CONFIG.apiUrl + "/session/init", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Bot-Token": CONFIG.token },
          body: JSON.stringify({ 
            bot: CONFIG.bot, 
            session_id: getSessionId(),
            page: window.location.pathname 
          })
        });
        const init = await res.json();
        
        addMessage(CONFIG.welcomeMessage, "bot");

        const savedName = sessionStorage.getItem("eg_name");
        const savedPhone = sessionStorage.getItem("eg_phone");

        if (init.onboarding_enabled && (!savedName || !savedPhone)) {
          sessionStorage.setItem("eg_flow", "ask_name");
          setTimeout(() => addMessage("Before we start, may I know your name?", "bot"), 600);
        }
      } catch { addMessage(CONFIG.welcomeMessage, "bot"); }
    }
  };

  box.querySelector("#eg-close-header").onclick = () => btn.click();
  box.querySelector("form").onsubmit = handleSend;
})();