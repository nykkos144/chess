import { calculateLevel } from '../../helpers/utils';
import './UserBlock.css';

const UserBlock = ({ user } : { user : any }) => {

    const [level, remainingXp, xpNeededToProgress] = calculateLevel(user.xp);

    return (
        <div className='user-block'>
            <div className='profile-pic' style={{ backgroundImage: `url(${ user.image || 'https://picsum.photos/50' })` }}></div>
            <label htmlFor="" className='user-name'>{ user.username }</label>
            <label htmlFor="" className='user-level'>LEVEL { level }</label>
            <div className='user-status'>
                <label htmlFor="">ONLINE</label>
                <label htmlFor="">INVITE</label>
            </div>
        </div>
        // <div className='user-block'>{ user.username }</div>
    );

}

export default UserBlock;