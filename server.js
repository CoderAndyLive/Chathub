// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let users = [];
let admin = null;
let bannedUsers = [];

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        handleUserMessage(ws, data);
    });

    ws.on('close', () => {
        handleUserDisconnect(ws);
    });
});

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

    if (data.type === 'ban' && ws === admin.ws) {
        const userToBan = users.find(user => user.username === data.username);
        if (userToBan) {
            bannedUsers.push(userToBan.username);
            userToBan.ws.send(JSON.stringify({ type: 'ban', message: 'You have been banned' }));
            userToBan.ws.close();
        }
    }
}

function handleUserDisconnect(ws) {
    users = users.filter(user => user.ws !== ws);
    if (admin && admin.ws === ws) {
        admin = users.length > 0 ? users[0] : null;
        if (admin) {
            admin.ws.send(JSON.stringify({ type: 'admin', message: 'You are the admin' }));
        }
    }
}

function broadcast(message) {
    users.forEach(user => user.ws.send(JSON.stringify(message)));
}

wss.on('listening', () => {
    console.log('WebSocket server is listening on ws://localhost:8080');
});