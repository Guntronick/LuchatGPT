const form = document.getElementById('chat-form');
const messagesContainer = document.getElementById('chat-messages');
const messageInput = document.getElementById('chat-message-input');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = messageInput.value;

  if (!message) {
    return;
  }

  // Envía una solicitud a la API de ChatGPT con el mensaje del usuario
  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      prompt: message,
      temperature: 0.5,
      max_tokens: 100
    })
  });

  const jsonResponse = await response.json();
  const responseText = jsonResponse.choices[0].text;

  // Agrega la respuesta de la API de ChatGPT al contenedor de mensajes
  const responseMessage = document.createElement('div');
  responseMessage.innerHTML = responseText;
  messagesContainer.appendChild(responseMessage);

  
  // Limpia el campo de entrada de mensajes
  messageInput.value = '';
});
