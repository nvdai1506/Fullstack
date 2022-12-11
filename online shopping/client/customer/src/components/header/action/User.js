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
  const onClickUserIconHandler = () => {
    navigate('/user/');
  }
  return (
    <div className={`action_item ${classes.user_container}`} >
      <div className={classes.user} onClick={onClickUserIconHandler}>
        <AiOutlineUser className='icon' />
      </div>
      <div className={classes.hide_ul_container}>
        <ul className={classes.ul}>
          {isLoggedIn && <li>
            <Link to='/user/profile'>Hồ sơ</Link>
          </li>}
          {isLoggedIn && <li>
            <Link to='/user/order-history'>Lịch sử mua hàng</Link>
          </li>}
          {isLoggedIn && <li onClick={logoutHandler}>
            <Link >Thoát</Link>
          </li>}
          {!isLoggedIn && <li>
            <Link to='/login'>Đăng Nhập</Link>
          </li>}
        </ul>
      </div>
    </div>
  )
}

export default User