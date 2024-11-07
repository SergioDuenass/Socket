const socket = io();
const usernameForm = document.getElementById('usernameForm');
const chat = document.getElementById('chat');
const messages = document.getElementById('messages');
const input = document.getElementById('m');

document.getElementById('joinBtn').onclick = () => {
    const username = document.getElementById('username').value;
    if (username) {
        socket.emit('join', username);
        usernameForm.style.display = 'none';
        chat.style.display = 'block';
    }
};

socket.on('message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
});

document.getElementById('sendBtn').onclick = () => {
    const msg = input.value;
    if (msg) {
        socket.emit('chat message', msg);
        input.value = '';
    }
};

socket.on('chat message', ({ user, message, date }) => {
    const item = document.createElement('li');
    item.textContent = `${date} - ${user}: ${message}`;
    messages.appendChild(item);
});
