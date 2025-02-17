import app from "./server.js";
import { createServer } from 'http';
import { Server } from 'socket.io';
import { errorLog, infoLog } from './middlewares/logger-middleware.js';

const PORT = process.env.PORT || 8080;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    infoLog.info(`Nuevo cliente conectado: ${socket.id}`);

    socket.on('chat message', (msg) => io.emit('chat message', msg));
    socket.on('add item', (product) => io.emit('add item', product));

    socket.on('disconnect', () => {
        infoLog.info(`Cliente desconectado: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    infoLog.info(`Sirviendo en http://localhost:${PORT} con PID: ${process.pid}`);
});

server.on('error', (err) => errorLog.error(`Error al iniciar el servidor: ${err}`));