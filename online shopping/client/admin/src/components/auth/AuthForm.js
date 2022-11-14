import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';
import AuthContext from '../../context/auth-context';
import Api from '../../service/api';

function AuthForm() {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);


    const submitHandler = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const result = Api.admin.login({
            email: enteredEmail,
            password: enteredPassword
        }).then(result => {
            return result.json();
        }).then(data => {
            authCtx.login(data);
            setIsLoading(false);
            history.replace('/');
        }).catch(err => console.log(err));

    }
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <h1>Login</h1>
            <div className={classes.info}>
                <label>Email: </label>
                <input type='email' id='email' ref={emailInputRef}></input>
            </div>
            <div className={classes.info}>
                <label>Password: </label>
                <input type='password' id='password' ref={passwordInputRef}></input>
            </div>
            {isLoading && <div><span>........</span></div>}
            <button>Login</button>
        </form>
    )
}

export default AuthForm