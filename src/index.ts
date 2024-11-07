import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    socket.on('join', (username: string) => {
        socket.username = username;
        socket.broadcast.emit('message', `${username} se ha unido a la conversación`);
    });

    socket.on('chat message', (msg: string) => {
        const date = new Date().toLocaleString();
        io.emit('chat message', { user: socket.username, message: msg, date });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `${socket.username} ha dejado la conversación`);
    });
});

server.listen(3000, () => {
    console.log('Corriendo!');
});
