// frontend/script.js
const ws = new WebSocket('ws://localhost:8080');

const userInput = document.getElementById('user');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesDiv = document.getElementById('messages');
const adminControls = document.getElementById('admin-controls');
const banUsernameInput = document.getElementById('ban-username');
const banButton = document.getElementById('ban-button');

let username = '';

ws.onopen = () => {
    sendButton.addEventListener('click', () => {
        if (!username) {
            username = userInput.value;
            ws.send(JSON.stringify({ type: 'login', username }));
        } else {
            const message = messageInput.value;
            ws.send(JSON.stringify({ type: 'message', username, message }));
        }
    });

    banButton.addEventListener('click', () => {
        const banUsername = banUsernameInput.value;
        ws.send(JSON.stringify({ type: 'ban', username: banUsername }));
    });
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'admin') {
        adminControls.style.display = 'block';
    }

    if (data.type === 'ban') {
        alert(data.message);
        ws.close();
    }

    if (data.type === 'userJoined') {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${data.username} hat den Chat betreten.`;
        messagesDiv.appendChild(messageElement);
    }
};