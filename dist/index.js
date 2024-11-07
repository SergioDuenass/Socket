"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static('public'));
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');
    socket.on('join', (username) => {
        socket.username = username;
        socket.broadcast.emit('message', `${username} se ha unido a la conversación`);
    });
    socket.on('chat message', (msg) => {
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
