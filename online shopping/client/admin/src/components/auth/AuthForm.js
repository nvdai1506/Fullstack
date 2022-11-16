import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';
import AuthContext from '../../context/auth-context';
import Api from '../../service/api';

function AuthForm() {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

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
        }).catch(err => {
            setError(true);
            setIsLoading(false);
        }
        );

    }
    const onClickHandler = () => {
        setError(false);
        setIsLoading(false);
    }
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <h1>Login</h1>
            <div className={classes.status}>
                {isLoading && <div><span>........</span></div>}
                {error && <div><span><p className={classes.loginFail}>Login Failed!</p></span></div>}
            </div>

            <div className={classes.info}>
                <label>Email: </label>
                <input type='email' id='email' ref={emailInputRef} onClick={onClickHandler}></input>
            </div>
            <div className={classes.info}>
                <label>Password: </label>
                <input type='password' id='password' ref={passwordInputRef}></input>
            </div>

            <button>Login</button>
        </form>
    )
}

export default AuthForm