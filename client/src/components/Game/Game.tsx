import { useEffect, useState, useContext } from 'react';
import './Game.css';

import ConnectPage from '../ConnectPage/ConnectPage';
import { GameContext } from '../../contexts/GameContext';
import { times } from '../../helpers/constants';
import { TimeInterface } from '../../helpers/interfaces';

import socket from '../../helpers/socket';

import WaitingPage from '../WaitingPage/WaitingPage';
import { UserContext } from '../../contexts/UserContext';
import PlayPage from '../PlayPage/PlayPage';


const Game = () => {

    const { user, loggedIn } = useContext(UserContext);

    const [inGame, setInGame] = useState<boolean>(false);

    const [roomCode, setRoomCode] = useState<string>('');
    const [playerJoined, setPlayerJoined] = useState<boolean>(false);
    const [joinedRoom, setJoinedRoom] = useState<boolean>(false);

    const [gameType, setGameType] = useState<string>('online');
    const [color, setColor] = useState<string>('auto');
    const [time, setTime] = useState<{ minutes : number, seconds : number }>({
        minutes: times[5].minutes,
        seconds: times[5].seconds
    });

    const [opponent, setOpponent] = useState<any>();

    const [autoColor, setAutoColor] = useState('white');
    
    const [searching, setSearching] = useState<any>(false);


    useEffect(() => {

        socket.on('connect', () => {
            if (user) {
                socket.emit('user-log', user.id);
            }
            console.log(socket.id)
        });

        socket.on('room-code', (code : string) => {
            setRoomCode(code);
        });

        socket.on('update-time', (time) => {
            setTime(time);
        });
        socket.on('update-color', (color, isAuto) => {
            if (isAuto) {
                // autoColor = color;
                setAutoColor(color);
            }
            setColor(isAuto ? 'auto' : color);
        });
        socket.on('update-opponent', (opponent) => {
            console.log(opponent)
            setOpponent(opponent);
        });

        socket.on('start-game', () => {
            setInGame(true);
        });

        socket.on('game-found', (color, code = null) => {
            setColor(color);
            if (code) {
                socket.emit('room-code', code);
            }
            if (user) {
                socket.emit('update-opponent', user);
            }
            // setTimeout(() => {
                setInGame(true);
            // }, 1000);
        })

    }, [user]);

    useEffect(() => {

        socket.on('joined-room', () => {
            setJoinedRoom(true);

            if (user) {
                socket.emit('update-opponent', user);
            }
        });

        socket.on('player-joined', () => {
            setPlayerJoined(true);

            console.log(color, autoColor);
            const colorOpposite = (color === 'auto' ? (autoColor === 'white' ? 'black' : 'white') : (color === 'white' ? 'black' : 'white'));
            socket.emit('update-color', colorOpposite, color === 'auto' ? true : false);
            socket.emit('update-time', time);

            if (user) {
                socket.emit('update-opponent', user);
            }

        });

        return () => {
            socket.off('player-joined');
        }

    }, [color, time, user, autoColor]);

    
    const updateGameType = (value : string) => {
        setGameType(value);
    }
    
    const updateColor = (value : string) => {
        setColor(value);

        let auto : string = '';
        
        if (value === 'auto') {
            const rand = Math.floor(Math.random() * 2) + 1;
            // autoColor = rand === 1 ? 'white' : 'black';
            auto = rand === 1 ? 'white' : 'black';
            setAutoColor(auto);
        }

        const colorOpposite = (value === 'auto' ? (auto === 'white' ? 'black' : 'white') : (value === 'white' ? 'black' : 'white'));
        socket.emit('update-color', colorOpposite, value === 'auto' ? true : false);
    }

    const updateTime = (value : { minutes : number, seconds : number }) => {
        setTime(value);
        socket.emit('update-time', value);
    }


    

    const createRoom = () => {

        if (roomCode) return;

        socket.emit('create-room');

    }

    const joinRoom = (code : string) => {

        if (roomCode) {
            console.log('in-room');
        };

        socket.emit('join-room', code);
    }

    const startGame = () => {

        if (gameType === 'vsFriend') {
            setInGame(true);
            socket.emit('start-game');
            return;
        }

        if (searching) {
            setSearching(false);
            socket.emit('cancel-search');
            return;
        }

        socket.emit('start-search', time);
        setSearching(true);

    }


    return ((loggedIn && user) || !loggedIn) && (
        
        <GameContext.Provider value={{
            gameType: gameType,
            updateGameType: updateGameType,
            
            color: color,
            updateColor: updateColor,
            autoColor: autoColor,

            time: time,
            updateTime: updateTime,

            roomCode: roomCode,
            playerJoined: playerJoined,

            opponent: opponent,

            searching: searching,

            createRoom: createRoom,
            joinRoom: joinRoom,

            inGame: inGame,
            startGame: startGame
        }}>
            
            {/* { opponent && opponent.username } */}
            {/* {color } { autoColor } */}

            { joinedRoom && !inGame ? (
                <WaitingPage />
            ) : (
                <div id='game-page' className={ inGame ? 'in-game' : '' }>
                    <PlayPage
                        // inGame={ inGame }
                        // color={ color === 'auto' ? autoColor : color }
                        // time={ time }
                        // opponent={ opponent }
                    />
                    <ConnectPage />
                </div>
            )}

            {/* { !joinedRoom ? (
                <div id='game-page'>
                    <PlayPage
                        color={ color === 'auto' ? autoColor : color }
                        time={ time }
                    />
                    <ConnectPage />
                </div>
            ) : (
                <WaitingPage />
            )} */}


        </GameContext.Provider>

    );

}

export default Game;