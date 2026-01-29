async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  const text = input.value.trim();
  if (!text) return;

  chatBox.innerHTML += `<div class="user">${text}</div>`;
  input.value = "";

  const response = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();
  chatBox.innerHTML += `<div class="bot">${data.reply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
