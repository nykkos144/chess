import { TimeInterface } from "./interfaces";

import target from '../assets/icons/target.svg';
import bolt from '../assets/icons/bolt.svg';
import clock from '../assets/icons/clock.svg';

export const times : TimeInterface [] = [
    {
        id: 0,
        image: 'target',
        label: '1 MIN',
        minutes: 1,
        seconds: 0
    },
    {
        id: 1,
        image: 'target',
        label: '1½ MIN',
        minutes: 1,
        seconds: 30
    },
    {
        id: 2,
        image: 'target',
        label: '2 MIN',
        minutes: 2,
        seconds: 0
    },

    {
        id: 3,
        image: 'bolt',
        label: '3 MIN',
        minutes: 3,
        seconds: 0
    },
    {
        id: 4,
        image: 'bolt',
        label: '4 MIN',
        minutes: 4,
        seconds: 0
    },
    {
        id: 5,
        image: 'bolt',
        label: '5 MIN',
        minutes: 5,
        seconds: 0
    },

    {
        id: 6,
        image: 'clock',
        label: '10 MIN',
        minutes: 10,
        seconds: 0
    },
    {
        id: 7,
        image: 'clock',
        label: '20 MIN',
        minutes: 20,
        seconds: 0
    },
    {
        id: 8,
        image: 'clock',
        label: '30 MIN',
        minutes: 30,
        seconds: 0
    },
];