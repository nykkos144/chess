import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Game from './components/Game/Game';
import { UserProvider } from './contexts/UserContext';


const App = () => {

    return (
        <UserProvider>
            <Game />
        </UserProvider>
    );

}


export default App;
