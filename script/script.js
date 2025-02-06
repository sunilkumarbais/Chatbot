async function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div class="message userMessage">${userInput}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  document.getElementById("user-input").value = "";

  const loaderMessage = document.createElement("div");
  loaderMessage.className = "message botMessage";
  loaderMessage.innerHTML = "<div class='loader'></div>";
  chatBox.appendChild(loaderMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput })
    });
    const data = await response.json();
    setTimeout(() => {
      loaderMessage.innerHTML = `<span class='typing'></span>`;
      typeMessage(data.reply, loaderMessage.querySelector('.typing'));
    }, 500);
  } catch (error) {
    loaderMessage.innerHTML = "⚠️ Error: Unable to get response. <button onclick='sendMessage()'>Retry</button>";
  }
}

function typeMessage(text, element) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 50);
    }
  }
  typing();
}

function handleKeyPress(event) {
  if (event.key === "Enter") sendMessage();
}