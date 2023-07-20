import { useContext } from 'react';
import './EndGameModal.css';

import credits from '../../assets/icons/credits.svg';
import { GameContext } from '../../contexts/GameContext';
import { UserContext } from '../../contexts/UserContext';
import { calculateLevel } from '../../helpers/utils';

const EndGameModal = ({ result, rematchClickCallback, rematchRequest } : any) => {

    const { user } : any = useContext(UserContext);
    
    const game : any = useContext(GameContext);
    const opponent = game.opponent;

    let xp = 0, level = 0, remainingXp = 0, levelInterval = 0;

    if (user) {
        [ level, remainingXp, levelInterval ] = calculateLevel(user.xp + (result === 'win' ? 50 : result === 'draw' ? 25 : 10));

    }


    const handleBackToMenuClick = () => {
        window.location.replace('/');
    }

    const handleRematchClick = () => {
        rematchClickCallback();
    }

    
    return (
        <div className='modal'>
            <label className='modal-main' htmlFor="">{ result === 'win' ? 'YOU WON' : result === 'lost' ? 'YOU LOST' : result === 'draw' ? 'DRAW' : '' }</label>
            <div className='modal-users'>
                <div className={'profile-pic ' + (result === 'win' ? 'active' : '')} style={{ 'gridArea': '1 / 1 / 3 / 2' }}></div>
                <label className='modal-user-name' style={{ 'gridArea': '1 / 2 / 2 / 3'  }}>YOU</label>
                <label className='modal-user-level' style={{ 'gridArea': '2 / 2 / 3 / 3' }}>{ user ? `LEVEL ${ level }` : 'NO ACCOUNT' }</label>

                <label className='modal-score-counter'>1 - 0</label>

                <label className='modal-user-name' style={{ 'gridArea': '1 / 4 / 2 / 5', 'justifySelf': 'flex-end' }}>{ opponent ? opponent.username : 'OPPONENT' }</label>
                <label className='modal-user-level' style={{ 'gridArea': '2 / 4 / 3 / 5', 'justifySelf': 'flex-end' }}>{ opponent ? `LEVEL ${ calculateLevel(opponent.xp)[0] }` : 'NO ACCOUNT' }</label>
                <div className={'profile-pic ' + (result === 'lost' ? 'active' : '')} style={{ 'gridArea': '1 / 5 / 3 / 6' }}></div>
            </div>

            { user && (
                <>
                    <div className='modal-gained'>
                        <div>+{ result === 'win' ? 50 : result === 'draw' ? 25 : 10 }px</div>
                        <div>+{ result === 'win' ? 20 : result === 'draw' ? 5 : 0 }<img src={ credits } /></div>
                    </div>
                    <div className='modal-progress-bar-container'>
                        <div className='modal-progress-bar-numbers'>
                            <label htmlFor="">{ level * levelInterval }</label>
                            <label htmlFor="">{ level * levelInterval + remainingXp }</label>
                            <label htmlFor="">{ (level + 1) * levelInterval }</label>
                        </div>
                        <div className='modal-progress-bar'>
                            <div style={{ 'width': `${ remainingXp / levelInterval * 100 }%` }}></div>
                        </div>
                    </div>
                </>
            )}

            {/* { rematchRequest && (
                <div className='rematch-request-container'>
                    { rematchRequest === 'you' ? 'WAITING FOR OPPONENT' : 'OPPONENT WANTS A REMATCH'}
                </div>
            )} */}

            <div className='button-container'>
                <button className='option' onClick={ handleBackToMenuClick }>BACK TO MENU</button>
                <button className={'submit main active ' + (rematchRequest === 'you' ? 'clicked' : '')} onClick={ handleRematchClick }>{ rematchRequest === 'you' ? 'WAITING' : rematchRequest === 'opponent' ? 'ACCEPT REMATCH' : 'INVITE TO REMATCH' }</button>
            </div>
        </div>
    );

}

export default EndGameModal;