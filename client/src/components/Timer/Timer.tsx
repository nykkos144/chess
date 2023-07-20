import { useEffect } from 'react';
import { formatTime } from '../../helpers/utils';
import './Timer.css';

const Timer = ({ running, time, updateTime } : any) => {

    useEffect(() => {

        let interval : any;

        if (running) {
            interval = setInterval(updateTime,  1000);
        }
    
        return () => {
          clearInterval(interval);
        };
        
    }, [running]);
      
    // console.log(time);

    return (
        // <div className='ut-timer' style={style}>
        <div className={'timer ' + (running ? 'active' : '')}>
            <label htmlFor="">{ formatTime(time.minutes, time.seconds) }</label>
        </div>
    );

}

export default Timer;