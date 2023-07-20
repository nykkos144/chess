import { ChangeEvent, useContext, useState } from 'react';
import './JoinWithCode.css';
import { GameContext } from '../../../contexts/GameContext';

const JoinWithCode = () => {

    const game : any = useContext(GameContext);
    
    const joinRoomCallback = game.joinRoom;
    
    const [code, setCode] = useState<string>('');

    const handleInput = (event : ChangeEvent<HTMLInputElement>) => {
        // console.log(event)
        setCode(event.target.value);
    }

    return (
        <div id='jwc-container'>
            <input className='main' type="text" placeholder='Enter room code' onInput={ handleInput } />
            <button className={'submit ' + (code.length > 0 ? 'active' : '') } onClick={ () => joinRoomCallback(code) }>JOIN</button>
        </div>
    );

}

export default JoinWithCode;