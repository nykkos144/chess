import { createContext } from "react";
import { io } from 'socket.io-client';

const URL = "http://localhost:6969";

export const socket = io(URL);
export const SocketContext = createContext({});