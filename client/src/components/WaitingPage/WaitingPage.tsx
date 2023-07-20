import { useContext } from 'react';
import './WaitingPage.css';

import { GameContext } from '../../contexts/GameContext';
import { formatTime } from '../../helpers/utils';

import close from '../../assets/icons/close.svg';

const WaitingPage = () => {

    const game : any = useContext(GameContext);

    const time = game.time;
    const color = game.color;
    const autoColor = game.autoColor;
    const opponent = game.opponent;


    return (
        <div id='waiting-page'>
            <h1>WAITING FOR THE HOST <br /> TO START THE GAME</h1>
            <div id='wp-close-button'>
                <img src={ close } alt="" />
            </div>
            
            <div id='wp-stats'>
                <div>
                    <label htmlFor="">{ formatTime(time.minutes, time.seconds) }</label>
                    <label htmlFor="">TIME</label>
                </div>
                <div>
                    <label htmlFor="">{ color.toUpperCase() }</label>
                    <label htmlFor="">COLOR</label>
                </div>
            </div>

        </div>
    );

}

export default WaitingPage;