import { useState, useContext, useEffect } from 'react';
import './UserPanel.css';
import CircleProgressBar from '../CircleProgressBar/CircleProgressBar';

import credits from '../../assets/icons/credits.svg';
import notifications from '../../assets/icons/notifications.svg';
import settings from '../../assets/icons/settings.svg';
import SearchPanel from '../SearchPanel/SearchPanel';
import { GameContext } from '../../contexts/GameContext';
import SignUpPanel from '../SignUpPanel/SignUpPanel';
import LogInPanel from '../LogInPanel/LogInPanel';
import { UserContext } from '../../contexts/UserContext';
import { calculateLevel } from '../../helpers/utils';

const UserPanel = () => {

    // const [user, setUser] = useState(null);
    
    const { user, loggedIn } = useContext(UserContext);

    // console.log(user)
    // let level = 0;

    // useEffect(() => {

    //     const [level, remainingXp, xpNeededToProgress] = calculateLevel(user.xp);
    //     console.log(level, remainingXp, xpNeededToProgress)
    // }, [user])

    const game : any = useContext(GameContext);
    const roomCode = game.roomCode;
    const playerJoined = game.playerJoined;

    const [openAuthPanel, setOpenAuthPanel] = useState<string>('');

    const closeAuthPanel = (value = 'close') => {

        setOpenAuthPanel('');

        if (value !== 'close') {
            setTimeout(() => {
                setOpenAuthPanel(value);
            }, 200);
        }

    }

    return (
        <div id='user-panel' className={'panel ' + (roomCode ? 'waiting' : '') + ' ' + (true ? '' : '')}>

            { loggedIn ? (
                <div id='logged-user-container'>
                    <div id='logged-user-bar'>
                        <div className='profile-pic' style={{ backgroundImage: `url(${ 'https://picsum.photos/200' })` }}></div>
                        <label htmlFor="" className='user-name'>{ user.username }</label>
                        <label htmlFor="" className='user-level'>LEVEL { calculateLevel(user.xp)[0] }</label>
                        <CircleProgressBar percentage={ (calculateLevel(user.xp)[1] / calculateLevel(user.xp)[2] * 100) } />
                    </div>
                    <div id='logged-user-details'>
                        <button className='credit-showcase'>
                            <img src={ credits } alt="" />
                            <label htmlFor="">{ user.credits }</label>
                        </button>
                        
                        <span></span>

                        <button className='icon'><img src={ notifications } alt="" /></button>
                        <button className='icon'><img src={ settings } alt="" /></button>
                    </div>
                </div>
            ) : (
                <>
                    <div id='auth-user-container'>
                        <button className='option' onClick={ () => setOpenAuthPanel('logIn') }>LOG IN</button>
                        <button className='submit active' onClick={ () => setOpenAuthPanel('signUp') }>SIGN UP</button>
                    </div>

                    <LogInPanel open={ openAuthPanel === 'logIn' ? true : false } closeCallback={ closeAuthPanel } />
                    <SignUpPanel open={ openAuthPanel === 'signUp' ? true : false } closeCallback={ closeAuthPanel } />

                </>
            )}

            <div></div>

            { roomCode && (
                <div id='opponent-connection-showcase' className={ playerJoined ? 'joined' : '' }>{ !playerJoined ? 'WAITING FOR OPPONENT' : 'OPPONENT HAS JOINED'}</div>
            )}

            <SearchPanel />
            
        </div>
    );

}

export default UserPanel;