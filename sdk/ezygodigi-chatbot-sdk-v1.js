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
    #eg-chat-container {
      position: fixed; bottom: 20px; right: 20px;
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      z-index: 10000; font-family: 'Segoe UI', Roboto, sans-serif;
    }
    
    #eg-chat-label {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white; width: 50px; height: 50px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      text-align: center; font-size: 10px; font-weight: 700; line-height: 1.1;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      cursor: pointer; animation: egBounce 4s infinite;
      padding: 5px; box-sizing: border-box; text-transform: uppercase;
    }

    #eg-chat-btn {
      width: 65px; height: 65px; border-radius: 50%;
      background: #ffffff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      transition: all 0.3s ease; border: 2px solid #6366f1;
    }
    #eg-chat-btn:hover { transform: scale(1.05); }

    .bot-eye { fill: #4338ca; animation: egBlink 4s infinite; transform-origin: center; }
    
    @keyframes egBlink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
    @keyframes egBounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-6px);} 60% {transform: translateY(-3px);} }

    #eg-chat-box {
      position: fixed; bottom: 20px; right: 20px;
      width: 380px; height: 550px; max-height: 90vh;
      background: #ffffff; border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      display: none; flex-direction: column;
      z-index: 10001; overflow: hidden;
    }
    #eg-chat-header {
      background: #6366f1; padding: 16px; color: white;
      display: flex; align-items: center; justify-content: space-between;
    }
    .eg-header-title { font-weight: 700; font-size: 16px; }
    #eg-chat-messages {
      flex: 1; padding: 15px; overflow-y: auto;
      background: #f8fafc; display: flex; flex-direction: column; gap: 10px;
    }
    .eg-msg-wrapper { display: flex; width: 100%; align-items: flex-end; gap: 8px; }
    .eg-msg-wrapper.eg-user-wrapper { flex-direction: row-reverse; }
    
    /* CRITICAL FIX: white-space: pre-wrap ensures bullet points and line breaks from DB are preserved */
    .eg-msg {
      max-width: 80%; padding: 10px 14px; font-size: 14px; border-radius: 15px;
      white-space: pre-wrap; word-wrap: break-word; line-height: 1.5;
    }
    
    .eg-bot { background: white; color: #334155; border: 1px solid #e2e8f0; border-bottom-left-radius: 2px; }
    .eg-user { background: #6366f1; color: white; border-bottom-right-radius: 2px; }
    #eg-chat-input-area { padding: 12px; background: white; border-top: 1px solid #f1f5f9; display: flex; gap: 8px; }
    #eg-chat-input-area input { flex: 1; border: 1px solid #e2e8f0; border-radius: 20px; padding: 10px 15px; outline: none; }
    #eg-chat-input-area button { background: #6366f1; border: none; width: 40px; height: 40px; border-radius: 50%; color: white; cursor: pointer; }
    @media(max-width:480px){ #eg-chat-box { width: 100vw; height: 100vh; bottom: 0; right: 0; border-radius: 0; } }
  `;
  document.head.appendChild(style);

  /* ================= UI ELEMENTS ================= */
  const modernBotSvg = `<svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="16" height="12" rx="3" stroke="#4338ca" stroke-width="2"/><circle cx="9" cy="11" r="1.5" class="bot-eye"/><circle cx="15" cy="11" r="1.5" class="bot-eye"/><path d="M9 15C9 15 10 16 12 16C14 16 15 15 15 15" stroke="#4338ca" stroke-width="1.5" stroke-linecap="round"/><path d="M12 6V4M10 4h4" stroke="#4338ca" stroke-width="2" stroke-linecap="round"/></svg>`;

  const container = document.createElement("div");
  container.id = "eg-chat-container";

  const label = document.createElement("div");
  label.id = "eg-chat-label";
  label.innerHTML = "HOW CAN<br>I HELP?";

  const btn = document.createElement("div");
  btn.id = "eg-chat-btn";
  btn.innerHTML = modernBotSvg;

  container.appendChild(label);
  container.appendChild(btn);
  document.body.appendChild(container);

  const box = document.createElement("div");
  box.id = "eg-chat-box";
  box.innerHTML = `
    <div id="eg-chat-header">
      <span class="eg-header-title">${CONFIG.title}</span>
      <button style="background:none; border:none; cursor:pointer; font-size:20px; color:white;" id="eg-close-chat">✕</button>
    </div>
    <div id="eg-chat-messages"></div>
    <form id="eg-chat-input-area">
      <input type="text" id="eg-main-input" placeholder="Type a message..." autocomplete="off" />
      <button type="submit">➤</button>
    </form>`;

  document.body.appendChild(box);

  const messagesDiv = box.querySelector("#eg-chat-messages");
  const inputEl = box.querySelector("#eg-main-input");

  /* ================= UPDATED LOGIC ================= */
  function addMessage(text, side) {
    if (!text) return;
    const wrapper = document.createElement("div");
    wrapper.className = `eg-msg-wrapper eg-${side}-wrapper`;
    
    const msgDiv = document.createElement("div");
    msgDiv.className = `eg-msg eg-${side}`;
    // Use textContent to ensure formatting (line breaks/bullets) from the DB string is rendered exactly
    msgDiv.textContent = text; 
    
    wrapper.appendChild(msgDiv);
    messagesDiv.appendChild(wrapper);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  async function handleMessageSubmit(e) {
    if (e) e.preventDefault();
    const text = inputEl.value.trim();
    if (!text) return;
    addMessage(text, "user");
    inputEl.value = "";
    
    const flow = sessionStorage.getItem("eg_flow");
    const sid = getSessionId();

    if (flow === "ask_name") {
      if (text.toLowerCase() !== "skip") sessionStorage.setItem("eg_name", text);
      if (sessionStorage.getItem("eg_db_ask_phone") === "true") {
        sessionStorage.setItem("eg_flow", "ask_phone");
        addMessage("Can I have your phone number? (or type skip)", "bot");
      } else { completeOnboarding(sid); }
      return;
    }

    if (flow === "ask_phone") {
      if (text.toLowerCase() !== "skip") sessionStorage.setItem("eg_phone", text);
      completeOnboarding(sid);
      return;
    }

    try {
      const res = await fetch(CONFIG.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Bot-Token": CONFIG.token },
        body: JSON.stringify({ bot: CONFIG.bot, message: text, session_id: sid })
      });
      const data = await res.json();
      // Fetches the 'reply' string directly from your database via the Worker
      addMessage(data.reply, "bot");
    } catch { addMessage("Connection error.", "bot"); }
  }

  async function completeOnboarding(sid) {
    await fetch(CONFIG.apiUrl + "/session/save", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Bot-Token": CONFIG.token },
      body: JSON.stringify({
        bot: CONFIG.bot, session_id: sid,
        name: sessionStorage.getItem("eg_name"),
        phone: sessionStorage.getItem("eg_phone")
      })
    });
    sessionStorage.removeItem("eg_flow");
    addMessage("Thanks! How can I help you now?", "bot");
  }

  const openChat = async () => {
    box.style.display = "flex";
    container.style.display = "none";
    if (messagesDiv.innerHTML === "") {
      try {
        const res = await fetch(CONFIG.apiUrl + "/session/init", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Bot-Token": CONFIG.token },
          body: JSON.stringify({ 
            bot: CONFIG.bot, session_id: getSessionId(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language, page: window.location.href
          })
        });
        const dbConfig = await res.json();
        
        // Render dynamic welcome message from DB if available, else use default
        addMessage(dbConfig.welcome_message || CONFIG.welcomeMessage, "bot");

        if (dbConfig.onboarding_enabled) {
          if (dbConfig.ask_name) {
            sessionStorage.setItem("eg_flow", "ask_name");
            sessionStorage.setItem("eg_db_ask_phone", dbConfig.ask_phone); 
            addMessage("What's your name?", "bot");
          } else if (dbConfig.ask_phone) {
            sessionStorage.setItem("eg_flow", "ask_phone");
            addMessage("Can I have your phone number?", "bot");
          }
        }
      } catch (err) {
        addMessage(CONFIG.welcomeMessage, "bot");
      }
    }
    setTimeout(() => inputEl.focus(), 100);
  };

  btn.onclick = openChat;
  label.onclick = openChat;
  box.querySelector("#eg-close-chat").onclick = () => {
    box.style.display = "none";
    container.style.display = "flex";
  };
  box.querySelector("form").onsubmit = handleMessageSubmit;

})();