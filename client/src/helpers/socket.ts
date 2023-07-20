import { io } from 'socket.io-client';

const URL = "http://localhost:6969";
const options = {
    "transports" : ["websocket"]
}

const socket = io(URL);

console.log(socket)

export default socket;
