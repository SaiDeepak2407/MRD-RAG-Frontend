let conversation = [];

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }

  const chatContainer = document.getElementById("chat-container");
  const inputEl = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  if (chatContainer && inputEl && sendBtn) {
    sendBtn.addEventListener("click", async () => {
      const message = inputEl.value.trim();
      if (!message) return;

      addMessage("user", message);
      inputEl.value = "";

      const typingBubble = addTypingIndicator();
      const startTime = Date.now();
      const botReply = await sendMessageToBackend(message);
      const elapsed = Date.now() - startTime;
      const minVisible = 1000;

      if (elapsed < minVisible) {
        await new Promise(res => setTimeout(res, minVisible - elapsed));
      }

      removeTypingIndicator(typingBubble);
      addMessage("bot", botReply);
      conversation.push({ patient: message, doctor: botReply });
    });

    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendBtn.click();
    });
  }

  function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-message" : "bot-message";
    msgDiv.textContent = text;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

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

const BACKEND_URL = "https://web-production-2e6ba.up.railway.app";

async function sendMessageToBackend(userMessage) {
  try {
    const response = await fetch(`${BACKEND_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, conversation }),
    });

    if (!response.ok) throw new Error(`Server returned ${response.status}`);
    const data = await response.json();

    if (data.response) {
      conversation = data.conversation;
      return data.response;
    }
    if (data.error) return "⚠️ " + data.error;
    return "⚕️ The system couldn’t generate a diagnosis right now.";
  } catch (err) {
    console.error("Backend Error:", err);
    return "❌ Unable to reach the backend.";
  }
}
