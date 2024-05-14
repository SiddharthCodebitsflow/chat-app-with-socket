const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('./config/config');
const routes = require('./routes/routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());

app.use('/api', routes);


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', { ...msg });
    });
});

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});
