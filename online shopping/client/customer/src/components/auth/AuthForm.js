import React, { useRef, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css';
import Api from '../../service/api';
import AuthContext from '../../context/auth-context';
import Loading from '../ui/Loading';
import StatusMess from '../ui/StatusMess';

function AuthForm({ loginMode }) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;


    if (loginMode) {
      setIsLoading(true);
      Api.shop.login({
        email: enteredEmail,
        password: enteredPassword
      }).then(result => {
        return result.json();
      }).then(data => {
        // console.log(data);
        authCtx.login(data);
        setIsLoading(false);
        setError(null);
        navigate('/');
      })
        .catch(err => {
          err.json().then(error => {
            const mess = error.message;
            setError(mess);
            setIsLoading(false);
          });
        });
    } else {
      setIsLoading(true);
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      Api.shop.signup({
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword
      }).then(result => {
        return result.json();
      }).then(data => {
        setIsLoading(false);
        setSuccess(true);
        setError(null);
        navigate('/login');
      })
        .catch(err => {
          err.json().then(error => {
            const mess = error.message;
            setError(mess);
            setIsLoading(false);
          });
        })

    }
  }
  return (
    <div className={classes.main}>
      <div className={classes.status}>
        {success && <StatusMess state='success' >You have successfully registered an account</StatusMess>}
        {!!error && <StatusMess state='error' >{error}</StatusMess>}
      </div>
      <form className={classes.authform} onSubmit={submitHandler}>
        <h3>Login Here</h3>
        <label htmlFor="username">Username</label>
        <input ref={emailInputRef} type="text" placeholder="Email or Phone" id="username" />
        <label htmlFor="password">Password</label>
        <input ref={passwordInputRef} type="password" placeholder="Password" id="password" />
        {!loginMode && <>
          <label htmlFor="password">Confirm Password</label>
          <input ref={confirmPasswordInputRef} type="password" placeholder="Confirm Password" id="confirmPassword" />
        </>}
        <div className={classes.loading_div}>
          {isLoading && <Loading className={classes.loading} />}
        </div>
        <button type='submit'>{loginMode ? 'Log In' : 'Sign Up'}</button>
        <div className={classes.signup}>
          <Link to={loginMode ? '/signup' : '/login'}>{loginMode ? 'Sign Up' : 'Log In'}</Link>
        </div>
        <div className={classes["social"]}>
          <div className={classes["go"]}>Google</div>
          <div className={classes["fb"]}>Facebook</div>
        </div>
      </form>
    </div>

  );
}

export default React.memo(AuthForm);