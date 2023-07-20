import { useContext, useRef, useState } from 'react';
import { times } from '../../../helpers/constants';
import { TimeInterface } from '../../../helpers/interfaces';
import './TimePicker.css';
import { formatTime } from '../../../helpers/utils';

import target from '../../../assets/icons/target.svg';
import bolt from '../../../assets/icons/bolt.svg';
import clock from '../../../assets/icons/clock.svg';
import pen from '../../../assets/icons/pen.svg';

import { GameContext } from '../../../contexts/GameContext';

const TimePicker = () => {

    const game : any = useContext(GameContext);

    const time = game.time;
    const updateTimeCallback = game.updateTime;

    const activeTime : TimeInterface = times.filter(x => x.minutes === time.minutes && x.seconds === time.seconds)[0] || {
        id : -1,
        // image : pen,
        image : 'pen',
        label : 'no',
        minutes : time.minutes,
        seconds : time.seconds
    };

    // const [activeTime, setActiveTime] = useState<number>(5);

    // const [activeTime, setActiveTime] = useState<TimeInterface>(times[5]);

    // const activeTimeData : TimeInterface = times[activeTime];

    const [isSetActive, setIsSetActive] = useState<boolean>(false);

    const minutesInput = useRef<HTMLInputElement>(null);
    const secondsInput = useRef<HTMLInputElement>(null);


    const handleTimeInput = () => {

        if (!minutesInput.current || !secondsInput.current) return;

        const minutes : number = parseInt(minutesInput.current.value);
        const seconds : number = parseInt(secondsInput.current.value);

        if ((!minutes || minutes === 0) && (!seconds || seconds === 0)) {
            setIsSetActive(false);
            return;
        }

        if (minutes < 0) {
            minutesInput.current.value = '0';
        }
        else if (minutes > 1440) {
            minutesInput.current.value = '1439';
        }

        if (seconds < 0) {
            secondsInput.current.value = '0';
        }
        else if (seconds > 59) {
            secondsInput.current.value = '59';
        }

        setIsSetActive(true);

    }

    const handleOptionClick = (time : TimeInterface) => {
        updateTimeCallback({
            minutes: time.minutes,
            seconds: time.seconds
        });
    }

    const handleSetClick = () => {

        if (!minutesInput.current || !secondsInput.current) return;

        const minutes : number = parseInt(minutesInput.current.value) || 0;
        const seconds : number = parseInt(secondsInput.current.value) || 0;

        if ((!minutes || minutes === 0) && (!seconds || seconds === 0)) {
            return;
        }

        updateTimeCallback({
            minutes: minutes,
            seconds: seconds
        })

        // setActiveTime({
        //     id: -1,
        //     image: pen,
        //     label: 'idk',
        //     minutes: minutes || 0,
        //     seconds: seconds || 0
        // });

    }

    return (
        <div id="time-picker">

            <div id='time-showcase'>
                <img src={ activeTime.image === 'target' ? target : activeTime.image === 'bolt' ? bolt : activeTime.image === 'clock' ? clock : activeTime.image === 'pen' ? pen : '' } alt="" />
                <label htmlFor="">{ formatTime(activeTime.minutes, activeTime.seconds) }</label>
            </div>

            <div id='times-container'>

                { times.map((time : TimeInterface, index : number) => {
                    return (
                        // <button key={ index } className={ 'option ' + (activeTime === index ? 'active' : '') } onClick={ () => setActiveTime(index) }>{ time.label }</button>
                        <button key={ index } className={ 'option ' + (activeTime.minutes === time.minutes && activeTime.seconds === time.seconds ? 'active' : '') } onClick={ () => handleOptionClick(time) }>{ formatTime(time.minutes, time.seconds) }</button>
                    );
                })}

                <input className='main' placeholder='MIN' type='number' min={ 0 } max={ 1439 } ref={ minutesInput } onInput={ handleTimeInput } />
                <input className='main' placeholder='SEC' type='number' min={ 0 } max={ 59 } ref={ secondsInput } onInput={ handleTimeInput } />
                <button className={'submit ' + (isSetActive ? 'active' : '') } onClick={ handleSetClick }>SET</button>

            </div>

        </div>
    );
    
}

export default TimePicker;