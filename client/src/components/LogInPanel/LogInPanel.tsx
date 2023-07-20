import { useEffect, useRef, useState } from 'react';
import './LogInPanel.css';
import axios from 'axios';

const LogInPanel = ({ open, closeCallback } : any) => {

    const form = useRef<HTMLFormElement>(null);

    const [error, setError] = useState<any>();

    const clearForm = () => {
        form.current?.reset();
        setError(false);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            clearForm();
        }, 200);

        return () => {
            clearTimeout(timeout);
        }
    }, [open]);

    const handleSubmit = async (e : any) => {
        e.preventDefault();

        let formData : FormData = new FormData(e.currentTarget.parentElement);
        let JSONFormData : any = {};

        formData.forEach((value, key) => {
            JSONFormData[key] = value;
        });
        
        axios.post('http://localhost:6969/api/user/login', JSONFormData).then((res : any) => {
            
            // if (res.data.error) {
            //     setError(res.data.error);
            //     return;
            // }

            // console.log(res);
            const token = res.data;

            localStorage.setItem('token', token);
            window.location.replace('/');

            closeCallback();

            setTimeout(() => {
                clearForm();
            }, 200);

        }).catch((error) => {

            setError(error.message);
            if (!error.response) {
                setError(error.message);
                return;
            }
            setError(error.response.data.error);

        });
    
    }

    const handleClose = (e : any) => {
        if (e.target.hasAttribute("data-form")) {
            closeCallback();
        }
    }

    return (
        <div id='form-panel' className={'form-container ' + ( open ? 'open' : '' ) } data-form="form_container" onClick={ handleClose }>
            <div className={'form ' + (error ? 'has-error' : '')}>
                <h1>Log in</h1>
                <h2>Log in and get access to all features</h2>
                { error ? <h3>{ error }</h3> : '' }
                <form ref={ form }>
                    <input className='main' type="text" autoComplete='off' placeholder='Username' name='username' maxLength={ 20 } required pattern="\S+" />
                    {/* <input type="email" placeholder='Email' name='email' maxLength={ 64 } required pattern="\S+" /> */}
                    <input className='main' type="password" autoComplete='off' placeholder='Password' name='password' minLength={ 6 } required pattern="\S+" />
                    <button type='submit' className='submit active' onClick={ handleSubmit }>LOG IN</button>
                </form>
            </div>
        </div>
    );

}

export default LogInPanel;