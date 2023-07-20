import { Component, useContext, useEffect, useState } from 'react';
import './PlayPage.css';

import Board from '../Board/Board';
import Bishop from '../../helpers/Pieces/Bishop';
import King from '../../helpers/Pieces/King';
import Knight from '../../helpers/Pieces/Knight';
import Pawn from '../../helpers/Pieces/Pawn';
import Queen from '../../helpers/Pieces/Queen';
import Rook from '../../helpers/Pieces/Rook';

// import { GameContext } from '../../contexts/GameContext';
import { UserContext } from '../../contexts/UserContext';
import { calculateLevel, isKingCheckedGrid } from '../../helpers/utils';
import Timer from '../Timer/Timer';
import { GameContext } from '../../contexts/GameContext';

import socket from '../../helpers/socket';
import TakenBlock from '../TakenBlock/TakenBlock';
import Piece from '../../helpers/Pieces/Piece';
import EndGameModal from '../EndGameModal/EndGameModal';
import axios from 'axios';

const PlayPage = () => {

    const game : any = useContext(GameContext);
    const inGame = game.inGame;
    const color = game.color === 'auto' ? game.autoColor : game.color;
    const time = game.time;
    const opponent = game.opponent;

    const { user } : any = useContext(UserContext);

    const [grid, setGrid] = useState<any>(initializeChessBoard(color));
    const [turn, setTurn] = useState('white');

    const [timeYou, setTimeYou] = useState<any>(time);
    const [timeOpponent, setTimeOpponent] = useState<any>(time);

    const [takenYou, setTakenYou] = useState<any>([]);
    const [takenOpponent, setTakenOpponent] = useState<any>([]);

    const [result, setResult] = useState<any>(null);

    const [rematchRequest, setRematchRequest] = useState<any>(null);


    useEffect(() => {
        setGrid(initializeChessBoard(color));
        setTurn('white');
        setTimeYou(time);
        setTimeOpponent(time);
    }, [inGame, time]);


    useEffect(() => {
      
        const handleMove = (startPos : any, endPos : any) => {

            setGrid((prevGrid : any) => {

                updateTaken(prevGrid, endPos);


                let tempGrid = [];
                for (let i = 0; i < prevGrid.length; i++) {
                    tempGrid.push([...prevGrid[i]]);
                }
        
                tempGrid[endPos.row][endPos.col] = tempGrid[startPos.row][startPos.col];
                tempGrid[startPos.row][startPos.col] = null;

                let draw : boolean = false;
                let lost : boolean = false;

                console.log(color)
                console.log(isKingCheckedGrid(tempGrid, color))

                const checked = isKingCheckedGrid(tempGrid, color);
                if (checked) {
                    console.log('checked')
                    lost = checkIfLost(tempGrid);
                }
                else {
                    console.log('not checked');
                    draw = checkIfDraw(tempGrid);
                }
                
                if (draw) {
                    console.log('draw');
                    handleDraw();
                }
                else if (lost) {
                    console.log('lost');
                    handleLoss();
                }

                return tempGrid;
            });
        
            updateTurn();

        };
        
        socket.on('move', handleMove);

        socket.on('win', () => {
            setResult('win');
            endGamePropUpdate('win');
        });
        socket.on('lost', () => {
            setResult('lost');
            endGamePropUpdate('lost');
        });
        socket.on('draw', () => {
            setResult('draw');
            endGamePropUpdate('draw');
        });

        socket.on('rematch-request', () => {
            setRematchRequest('opponent');
        });

        socket.on('rematch-accepted', () => {
            restartGame();
        })
    
        return () => {
            socket.off('move', handleMove);
        };

    }, [socket, color]);
    
    
    const pieceMove = (startPos : any, endPos : any) => {

        let tempGrid : any = [];
        for (let i = 0; i < grid.length; i++) {
            tempGrid.push([...grid[i]]);
        }

        tempGrid[endPos.row][endPos.col] = tempGrid[startPos.row][startPos.col]
        tempGrid[startPos.row][startPos.col] = null;

        socket.emit('move', startPos, endPos);

        updateTaken(grid, endPos);

        setTurn(prevTurn => prevTurn === 'white' ? 'black' : 'white');
        setGrid(tempGrid);
    }

    const checkIfLost = (grid : any) => {

        let kingPos  : any;

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                const piece = grid[i][j];
                if (piece && piece.color === color && piece instanceof King) {
                    kingPos = {
                        row: i,
                        col: j
                    }
                    break;
                }
            }
        }
        


        const canKingMove = grid[kingPos.row][kingPos.col].getCheckedSave(kingPos, grid).length > 0 ? true : false;

        if (canKingMove) {
            return false;
        }


        let tempGrid : any = [];
        for (let i = 0; i < grid.length; i++) {
            tempGrid.push([...grid[i]]);
        }

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
    
                const piece = grid[i][j];
    
                if (!piece) continue;
                if (piece.color !== color) continue;
                if (piece instanceof King) continue;
                

                const checked = piece.getChecked({ row: i, col: j }, grid);
                
                for (let pos of checked) {
                    // const { pRow, pCol } = pos;
                    const pRow = pos.row;
                    const pCol = pos.col;

                    const checkedNode = grid[pRow][pCol];

                    if (checkedNode && checkedNode.color === color) continue;

                    tempGrid[pRow][pCol] = new Piece(color, '');
                    // tempGrid[pRow][pCol] = new Pawn(color);

                }

            }
        }


        const saveChecked = isKingCheckedGrid(tempGrid, color);

        if (!saveChecked) {
            return false;
        }


        
        return true;

    }

    const checkIfDraw = (grid : any) => {

        let tempGrid : any = [];
        for (let i = 0; i < grid.length; i++) {
            tempGrid.push([...grid[i]]);
        }

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
    
                const piece = grid[i][j];
    
                if (!piece) continue;
                if (piece.color !== color) continue;
                // if (piece instanceof King) continue;
                

                const checked = piece.getCheckedSave({ row: i, col: j }, grid);
                
                for (let pos of checked) {
                    // const { pRow, pCol } = pos;
                    const pRow = pos.row;
                    const pCol = pos.col;

                    const checkedNode = grid[pRow][pCol];

                    if (checkedNode && checkedNode.color === color) continue;

                    tempGrid[pRow][pCol] = new Piece(color, '');
                    // tempGrid[pRow][pCol] = new Pawn(color);

                }

            }
        }


        const saveChecked = isKingCheckedGrid(tempGrid, color);

        if (!saveChecked) {
            return false;
        }

        
        return true;

    }

    const updateTimeYou = () => {

        setTimeYou((prevTime : any) => {
            let minutes = prevTime.minutes;
            let seconds = prevTime.seconds - 1;
        
            if (seconds === -1) {
                minutes -= 1;
            
                if (minutes === -1) {
                    handleLoss();
                    return prevTime;
                }
            
                seconds = 59;
            }
        
            return {
                minutes: minutes,
                seconds: seconds
            };
        });
        
    }
    const updateTimeOpponent = () => {

        setTimeOpponent((prevTime : any) => {
            let minutes = prevTime.minutes;
            let seconds = prevTime.seconds - 1;
        
            if (seconds === -1) {
                minutes -= 1;
            
                if (minutes === -1) {
                    handleWin();
                    return prevTime;
                }
            
                seconds = 59;
            }
        
            return {
                minutes: minutes,
                seconds: seconds
            };
        });

    }

    const updateTaken = (grid : any, endPos : any) => {

        if (grid[endPos.row][endPos.col]) {
            if (grid[endPos.row][endPos.col].color === color) {
                setTakenOpponent((prev : any) => [...prev, grid[endPos.row][endPos.col].constructor.name.toLowerCase()]);
            }
            else {
                setTakenYou((prev : any) => [...prev, grid[endPos.row][endPos.col].constructor.name.toLowerCase()]);
            }
        }

    }

    const updateTurn = () => {
        setTurn(prevTurn => prevTurn === 'white' ? 'black' : 'white');
    }

    const handleLoss = () => {
        setResult('lost');
        socket.emit('win');
        endGamePropUpdate('lost');
    }
    const handleWin = () => {
        setResult('win');
        socket.emit('lost');
        endGamePropUpdate('win');
    }
    const handleDraw = () => {
        setResult('draw');
        socket.emit('draw');
        endGamePropUpdate('draw');
    }
    

    const endGamePropUpdate = (res : string) => {
        
        const token = localStorage.getItem('token');

        if (!token) return;

        axios.put('http://localhost:6969/api/user', {
            xp: res === 'win' ? 50 : res === 'draw' ? 25 : 10,
            credits: res === 'win' ? 20 : res === 'draw' ? 5 : 0,
        }, {
            headers: {
                token: localStorage.getItem('token')
            },

        });

    }

    const handleRematchClick = () => {

        if (!rematchRequest) {
            setRematchRequest('you');
            socket.emit('rematch-request');
            return;
        }

        if (rematchRequest === 'opponent') {
            socket.emit('rematch-accepted');
            restartGame();
        }

    }


    const restartGame = () => {
        if (user) {
            user.xp += result === 'win' ? 50 : result === 'draw' ? 25 : 10;
            user.credits += result === 'win' ? 20 : result === 'draw' ? 5 : 0;
        }

        setGrid(initializeChessBoard(color));
        setTurn('white');
        setTimeYou(time);
        setTimeOpponent(time);
        setResult(null);
        setRematchRequest(null);
        setTakenYou([]);
        setTakenOpponent([]);
    }

    return (
        <div id='play-page'>
            
            { inGame && (
                <>
                    <div id='user-time-container'>
                        <div className='profile-pic ut-image' style={{'backgroundImage': `url(${ 'https://picsum.photos/200' })`}}></div>
                        <label htmlFor="" className='ut-name top'>{ opponent ? opponent.username : 'OPPONENT' }</label>
                        <label htmlFor="" className='ut-level top'>{ opponent ? `LEVEL ${ calculateLevel(opponent.xp)[0] }` : 'NO ACCOUNT' }</label>
        
                        <Timer running={ turn !== color && !result } time={ timeOpponent } updateTime={ updateTimeOpponent } />
        
                        <div></div>
        
                        <Timer running={ turn === color && !result } time={ timeYou } updateTime={ updateTimeYou } />
        
                        <label htmlFor="" className='ut-level bottom'>{ user ? `LEVEL ${ calculateLevel(user.xp)[0] }` : 'NO ACCOUNT' }</label>
                        <label htmlFor="" className='ut-name bottom'>YOU</label>
                        <div className='profile-pic ut-image' style={{'backgroundImage': `url(${ 'https://picsum.photos/300' })`}}></div>
                    </div>
        
                    <div></div>
                </>
            )}


            <Board grid={ grid } pieceMoveCallback={ pieceMove } color={ color } turn={ turn } />

            { inGame && (
                <>
                    <div id='taken-pieces-container'>

                        <TakenBlock taken={ takenOpponent } color={ color === 'white' ? 'white' : 'black' } />
                        
                        <div></div>

                        <TakenBlock taken={ takenYou } color={ color === 'white' ? 'black' : 'white' } />

                    </div>

                    <div></div>

                    <div></div>                
                </>
            )}

            { inGame && result && (
                <div className='modal-container'>
                    <EndGameModal result={ result } rematchClickCallback={ handleRematchClick } rematchRequest={ rematchRequest } />
                </div>
            )}


        </div>
    );
    
}

const initializeChessBoard = (color : string) => {
    if (color === 'white') {
        return [
            [new Rook('black'), new Knight('black'), new Bishop('black'), new Queen('black'), new King('black'), new Bishop('black'), new Knight('black'), new Rook('black')],
            [new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black')],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white')],
            [new Rook('white'), new Knight('white'), new Bishop('white'), new Queen('white'), new King('white'), new Bishop('white'), new Knight('white'), new Rook('white')]
        ]
    }
    else if (color === 'black') {
        return [
            [new Rook('white'), new Knight('white'), new Bishop('white'), new King('white'), new Queen('white'), new Bishop('white'), new Knight('white'), new Rook('white')],
            [new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white')],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black')],
            [new Rook('black'), new Knight('black'), new Bishop('black'), new King('black'), new Queen('black'), new Bishop('black'), new Knight('black'), new Rook('black')],
        ]
    }
}

// const initializeChessBoard = (color : string) => {
//     if (color === 'white') {
//         return [
//             [new Rook('black'), new Knight('black'), new Bishop('black'), new Queen('black'), new King('black'), new Bishop('black'), new Knight('black'), new Rook('black')],
//             [null, null, null, null, null, null, null, null],
//             [null, null, null, null, null, null, null, null],
//             [null, null, null, null, null, null, null, null],
//             [null, null, null, null, null, null, null, null],
//             [null, null, null, null, null, null, null, null],
//             [null, null, null, null, null, null, null, null],
//             [new Rook('white'), new Knight('white'), new Bishop('white'), new Queen('white'), new King('white'), new Bishop('white'), new Knight('white'), new Rook('white')]
//         ]
//     }
//     else if (color === 'black') {
//         return [
//             [new Rook('white'), new Knight('white'), new Bishop('white'), new King('white'), new Queen('white'), new Bishop('white'), new Knight('white'), new Rook('white')],
//             [null, null, null, null, null, null, null, null],
//             [null, null, null, null, null, null, null, null],
//             [null, null, null, null, null, null, null, null],
//             [null, null, null, null, null, null, null, null],
//             [null, null, null, null, null, null, null, null],
//             [null, null, null, null, null, null, null, null],
//             [new Rook('black'), new Knight('black'), new Bishop('black'), new King('black'), new Queen('black'), new Bishop('black'), new Knight('black'), new Rook('black')],
//         ]
//     }
// }


export default PlayPage;