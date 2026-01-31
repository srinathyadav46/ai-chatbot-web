const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatBox = document.getElementById("chat-box");
const clearBtn = document.getElementById("clear-btn");

const API_URL = "/chat";


// ================= ADD MESSAGE =================
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `msg ${sender}`;
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;
}


// ================= TYPING ANIMATION =================
function addTyping() {
  const typing = document.createElement("div");
  typing.className = "msg bot typing";
  typing.innerText = "Typing...";

  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  return typing;
}


// ================= SEND MESSAGE =================
async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  const typing = addTyping();

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    typing.remove();
    addMessage(data.reply, "bot");

    saveHistory();

  } catch (err) {
    typing.innerText = "Server waking up... please wait ⏳";
  }
}


// ================= CLEAR CHAT =================
function clearChat() {
  chatBox.innerHTML = "";
  localStorage.removeItem("chatHistory");
}


// ================= EVENTS =================
sendBtn.onclick = sendMessage;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

clearBtn.onclick = clearChat;   // ⭐ THIS WAS MISSING


// ================= SAVE HISTORY =================
function saveHistory() {
  localStorage.setItem("chatHistory", chatBox.innerHTML);
}


// ================= LOAD HISTORY =================
window.onload = () => {
  const history = localStorage.getItem("chatHistory");
  if (history) chatBox.innerHTML = history;
};