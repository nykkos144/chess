import { useEffect, useRef, useState } from 'react';
import './SignUpPanel.css';
import axios from 'axios';

const SignUpPanel = ({ open, closeCallback } : any) => {

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
        
        axios.post('http://localhost:6969/api/user/create', JSONFormData).then((res : any) => {
            
            // if (res.data.error) {
            //     setError(res.data.error);
            //     return;
            // }

            closeCallback('logIn');

            setTimeout(() => {
                clearForm();
            }, 200);

        }).catch((error) => {

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
        <div id='sign-up-panel' className={'form-container ' + ( open ? 'open' : '' ) } data-form="form_container" onClick={ handleClose }>
            <div className={'form ' + (error ? 'has-error' : '')}>
                <h1>Sign up</h1>
                <h2>Sign up to our platform and get access to all features</h2>
                { error ? <h3>{ error }</h3> : '' }
                <form ref={ form }>
                    <input className='main' type="text" autoComplete='off' placeholder='Username' name='username' maxLength={ 20 } required pattern="\S+" />
                    {/* <input type="email" placeholder='Email' name='email' maxLength={ 64 } required pattern="\S+" /> */}
                    <input className='main' type="password" autoComplete='off' placeholder='Password' name='password' minLength={ 6 } required pattern="\S+" />
                    <button className='submit active' onClick={ handleSubmit }>SIGN UP</button>
                </form>
            </div>
        </div>
    );

}

export default SignUpPanel;