import { useState, useContext } from 'react';
import './ControlPanel.css';
import TimePicker from './TimePicker/TimePicker';
import JoinWithCode from './JoinWithCode/JoinWithCode';
import { GameContext } from '../../contexts/GameContext';

const ControlPanel = () => {

    const game : any = useContext(GameContext);
    
    const gameType = game.gameType;
    const updateGameTypeCallback = game.updateGameType;
    const color = game.color;
    const updateColorCallback = game.updateColor;
    const searching = game.searching;

    const roomCode = game.roomCode;
    const playerJoined = game.playerJoined;

    const createRoomCallback = game.createRoom;
    const startGameCallback = game.startGame;


    return (
        <div id='control-panel' className='panel'>

            <div className='button-container'>
                <button className={ 'option ' + (gameType === 'online' ? 'active' : '') } onClick={ () => updateGameTypeCallback('online') }>ONLINE</button>
                <button className={ 'option ' + (gameType === 'vsFriend' ? 'active' : '') } onClick={ () => updateGameTypeCallback('vsFriend') }>VS FRIEND</button>
            </div>

            <hr />

            <TimePicker />

            <hr />

            {/* { gameType === 'online' && (
                <>

                </>
            )} */}

            { gameType === 'vsFriend' && (
                <>
                    <div className='button-container'>
                        <button className={ 'option ' + (color === 'white' ? 'active' : '') } onClick={ () => updateColorCallback('white') }>WHITE</button>
                        <button className={ 'option ' + (color === 'black' ? 'active' : '') } onClick={ () => updateColorCallback('black') }>BLACK</button>
                        <button className={ 'option ' + (color === 'auto' ? 'active' : '') } onClick={ () => updateColorCallback('auto') }>AUTO</button>
                    </div>

                    <hr />

                    <JoinWithCode />

                    <button className={'submit main active ' + (roomCode ? 'has-code' : '')} onClick={ createRoomCallback }>{ !roomCode ? '> GET CODE <' : roomCode }</button>

                    <hr />

                </>
            )}

            <button className={'submit main ' + (gameType === 'online' ? 'active' : gameType === 'vsFriend' && playerJoined ? 'active' : '')} onClick={ startGameCallback }>{ gameType === 'online' ? searching ? 'CANCEL SEARCH' : 'START SEARCH' : 'START GAME' }</button>

        </div>
    );

}

export default ControlPanel;