let conversation = [];

// ============================================================
// 🌐 MRD-RAG Frontend Script (Theme + Chatbot + Typing Animation)
// ============================================================

// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ MRD-RAG Website Loaded");
 
  // --------------------------
  // 🌙 GLOBAL DARK MODE TOGGLE
  // --------------------------
  const toggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  // Apply saved theme
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  // Handle toggle click (only on Home Page)
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // --------------------------
  // 💬 CHATBOT LOGIC
  // --------------------------
  const chatContainer = document.getElementById("chat-container");
  const inputEl = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  if (chatContainer && inputEl && sendBtn) {
    sendBtn.addEventListener("click", async () => {
      const message = inputEl.value.trim();
      if (!message) return;

      addMessage("user", message);
      inputEl.value = "";

     // Add typing animation
const typingBubble = addTypingIndicator();

// Wait a bit so animation is visible even for fast responses
const startTime = Date.now();
const botReply = await sendMessageToBackend(message);
const elapsed = Date.now() - startTime;
const minVisible = 1000; // 1 second minimum

if (elapsed < minVisible) {
  await new Promise(res => setTimeout(res, minVisible - elapsed));
}

// Remove typing indicator and add real reply
removeTypingIndicator(typingBubble);
addMessage("bot", botReply);

conversation.push({ patient: message, doctor: botReply });
    });

    // Allow pressing Enter to send message
    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendBtn.click();
    });
  }

  // --------------------------
  // 💡 Chat UI Helpers
  // --------------------------
  function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-message" : "bot-message";
    msgDiv.textContent = text;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Typing indicator
  function addTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "bot-message typing";
    typingDiv.innerHTML = `
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    `;
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return typingDiv;
  }

  function removeTypingIndicator(typingDiv) {
    if (typingDiv && chatContainer.contains(typingDiv)) {
      chatContainer.removeChild(typingDiv);
    }
  }
});

// --------------------------
// 🔗 BACKEND API CONNECTION
// --------------------------
const BACKEND_URL = "https://web-production-2e6ba.up.railway.app"; // ❌ remove trailing slash
async function sendMessageToBackend(userMessage) {
  try {
    const response = await fetch(`${BACKEND_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, conversation }),  // ✅ send conversation context
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();

    if (data.response) {
      conversation = data.conversation; // ✅ keep conversation memory
      return data.response;
    }

    if (data.error) {
      return "⚠️ " + data.error;
    }

    return "⚕️ The system couldn’t generate a diagnosis right now.";

  } catch (err) {
    console.error("Backend Error:", err);
    return "❌ Unable to reach the backend.";
  }
}

