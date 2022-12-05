import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import classes from './User.module.css';
import { AiOutlineUser } from 'react-icons/ai';
import AuthContext from '../../../context/auth-context';

function User() {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/login');
  }
  return (
    <div className={`action_item ${classes.user_container}`}>
      <div className={classes.user}>
        <AiOutlineUser className='icon' />
      </div>
      <div className={classes.hide_ul_container}>
        <ul className={classes.ul}>
          {isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn && <li>
            <Link to='/order'>My Purchase</Link>
          </li>}
          {isLoggedIn && <li onClick={logoutHandler}>
            <Link >Logout</Link>
          </li>}
          {!isLoggedIn && <li>
            <Link to='/login'>Login</Link>
          </li>}
        </ul>
      </div>
    </div>
  )
}

export default User