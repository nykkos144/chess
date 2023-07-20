import { useEffect } from 'react';
import ControlPanel from '../ControlPanel/ControlPanel';
import UserPanel from '../UserPanel/UserPanel';
import './ConnectPage.css';

const ConnectPage = () => {

    return (
        <div id='connect-component' className='container'>
            {/* <label htmlFor="">CONNECT</label> */}
            <ControlPanel />
            <UserPanel />
        </div>
    );

}

export default ConnectPage;