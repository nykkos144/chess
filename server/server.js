require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { createServer } = require("http");
const socketIO = require("socket.io");

const crypto = require('crypto');

const connectDB = require('./config/db');

const UserRoute = require('./routes/UserRoute');

const app = express();


connectDB();


app.use(cors());
app.use(express.json());

app.use('/api/user', UserRoute);

app.get('/', (req, res) => {
    res.send('GET "/" WORKS');
});


const server = createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });


let users = [];

let onlineQueue = [];

io.on('connection', (socket) => {

    console.log("New client connected -- " + socket.id);

    let userId;

    socket.on('user-log', (id) => {
        userId = id;
        users.push({
            socket: socket.id,
            userId: id
        });
    });

    let roomCode = null;

    socket.on('create-room', () => {
        const code = crypto.randomBytes(3).toString("hex");

        socket.join(code);
        socket.emit('room-code', code);
    
        roomCode = code;
    });
    
    socket.on('join-room', (code) => {

        if (!io.of('/').adapter.rooms.get(code)) {
            socket.emit('invalid-room');
            return;
        }
        if (io.of('/').adapter.rooms.get(code).size === 2) {
            socket.emit('full-room');
            return;
        }

        socket.join(code);
        socket.to(code).emit('player-joined');
        roomCode = code;

        socket.emit('joined-room');
    });

    socket.on('room-code', (code) => {
        console.log('room-code: ', code);
        roomCode = code;
    });


    socket.on('update-time', (time) => {
        socket.to(roomCode).emit('update-time', time);
    });
    socket.on('update-color', (color, isAuto) => {
        socket.to(roomCode).emit('update-color', color, isAuto);
    });
    socket.on('update-opponent', (opponent) => {
        socket.to(roomCode).emit('update-opponent', opponent);
    });


    socket.on('start-game', () => {
        socket.to(roomCode).emit('start-game');
    });


    socket.on('start-search', (time) => {
        
        const seconds = time.minutes * 60 + time.seconds;

        const search = onlineQueue.find(element => element.time === seconds);

        if (search) {
            
            const socketOpp = io.sockets.sockets.get(search.socket);
            
            const code = crypto.randomBytes(3).toString("hex");
            roomCode = code;
                        
            socket.join(code);
            socketOpp.join(code);

            socket.emit('game-found', 'black');
            socket.to(code).emit('game-found', 'white', code);

            return;
        }

        onlineQueue.push({
            socket: socket.id,
            time: seconds
        });
    });
    socket.on('cancel-search', () => {
        onlineQueue = onlineQueue.filter(x => x.socket !== socket.id);
    });

    // GAME ///////////////////////////////

    socket.on('move', (startPos, endPos) => {

        const oppositeStartPos = {
            row: 7 - startPos.row,
            col: 7 - startPos.col
        }
        const oppositeEndPos = {
            row: 7 - endPos.row,
            col: 7 - endPos.col
        }

        socket.to(roomCode).emit('move', oppositeStartPos, oppositeEndPos);
    });


    socket.on('win', () => {
        socket.to(roomCode).emit('win');
    });

    socket.on('lost', () => {
        socket.to(roomCode).emit('lost');
    });

    socket.on('draw', () => {
        socket.to(roomCode).emit('draw');
    });

    socket.on('rematch-request', () => {
        socket.to(roomCode).emit('rematch-request');
    });
    socket.on('rematch-accepted', () => {
        socket.to(roomCode).emit('rematch-accepted');
    })


    socket.on('disconnect', () => {
        console.log('A user disconnected');
        socket.to(roomCode).emit('disconnected');
        users = users.filter(x => x.socket !== socket.id);
        onlineQueue = onlineQueue.filter(x => x.socket !== socket.id);
    });

});


const PORT = process.env.PORT || 6969;

server.listen(PORT, () => {
    console.log(`App running on port ${ PORT }`)
});
