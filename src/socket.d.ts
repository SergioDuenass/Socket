import { Socket } from 'socket.io';

declare module 'socket.io' {
    interface Socket {
        username?: string; // Agrega la propiedad username
    }
}
