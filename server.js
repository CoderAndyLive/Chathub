const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let users = [];
let admin = null;
let bannedUsers = [];

// Handle new WebSocket connections
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        handleUserMessage(ws, data);
    });

    ws.on('close', () => {
        handleUserDisconnect(ws);
    });
});

/**
 * Handle incoming messages from users
 * @param {WebSocket} ws - The WebSocket connection
 * @param {Object} data - The message data
 */
function handleUserMessage(ws, data) {
    if (data.type === 'login') {
        if (bannedUsers.includes(data.username)) {
            ws.send(JSON.stringify({ type: 'ban', message: 'You are banned' }));
            ws.close();
            return;
        }

        const user = { id: ws._socket.remoteAddress, username: data.username, ws };
        users.push(user);

        if (!admin) {
            admin = user;
            ws.send(JSON.stringify({ type: 'admin', message: 'You are the admin' }));
        }

        broadcast({ type: 'userJoined', username: data.username });
    }

    if (data.type === 'message') {
        broadcast({ type: 'message', username: data.username, message: data.message });
    }

    if (data.type === 'ban' && ws === admin.ws) {
        const userToBan = users.find(user => user.username === data.username);
        if (userToBan) {
            bannedUsers.push(userToBan.username);
            userToBan.ws.send(JSON.stringify({ type: 'ban', message: 'You have been banned' }));
            userToBan.ws.close();
        }
    }
}

/**
 * Handle user disconnection
 * @param {WebSocket} ws - The WebSocket connection
 */
function handleUserDisconnect(ws) {
    users = users.filter(user => user.ws !== ws);
    if (admin && admin.ws === ws) {
        admin = users.length > 0 ? users[0] : null;
        if (admin) {
            admin.ws.send(JSON.stringify({ type: 'admin', message: 'You are the admin' }));
        }
    }
}

/**
 * Broadcast a message to all connected users
 * @param {Object} message - The message to broadcast
 */
function broadcast(message) {
    users.forEach(user => user.ws.send(JSON.stringify(message)));
}

// Log when the WebSocket server is listening
wss.on('listening', () => {
    console.log('WebSocket server is listening on ws://localhost:8080');
});