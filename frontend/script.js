const ws = new WebSocket('ws://localhost:8080');

const userInput = document.getElementById('user');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesDiv = document.getElementById('messages');
const adminControls = document.getElementById('admin-controls');
const banUsernameInput = document.getElementById('ban-username');
const banButton = document.getElementById('ban-button');

let username = '';

// WebSocket connection opened
ws.onopen = () => {
    // Handle send button click
    sendButton.addEventListener('click', () => {
        if (!username) {
            // Login user
            username = userInput.value;
            ws.send(JSON.stringify({ type: 'login', username }));
        } else {
            // Send message
            const message = messageInput.value;
            ws.send(JSON.stringify({ type: 'message', username, message }));
        }
    });

    // Handle ban button click
    banButton.addEventListener('click', () => {
        const banUsername = banUsernameInput.value;
        ws.send(JSON.stringify({ type: 'ban', admin: username, username: banUsername }));
    });
};

// Handle incoming WebSocket messages
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'admin') {
        // Show admin controls
        adminControls.style.display = 'block';
    }

    if (data.type === 'ban') {
        // Alert user and close WebSocket connection
        alert(data.message);
        ws.close();
    }

    if (data.type === 'userJoined') {
        // Display user joined message
        const messageElement = document.createElement('div');
        messageElement.textContent = `${data.username} hat den Chat betreten.`;
        messagesDiv.appendChild(messageElement);
    }

    if (data.type === 'message') {
        // Display chat message
        const messageElement = document.createElement('div');
        messageElement.textContent = `${data.username}: ${data.message}`;
        messagesDiv.appendChild(messageElement);
    }
};