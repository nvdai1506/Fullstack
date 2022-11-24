import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from './MainNavigation.module.css';
import AuthContext from "../../context/auth-context";
import { FaCartPlus, FaUser, FaBars } from 'react-icons/fa';

function MainNavigation() {
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/login');
    }
    const onCartClicked = () =>{
        navigate('/cart');
    }
    return (
        <header className={classes.headerNav}>
            <div className={classes.logo}><Link to='/'>Shop</Link></div>
            <nav className={classes["nav_dropdown"]}>
                <ul className={classes["ul_dropdown"]}>
                    <li className={classes["li_dropdown"]}>
                        <FaBars />
                        <ul>
                            <li>
                                <Link >Profile</Link >
                            </li>
                            <li>
                                <Link >Login</Link >
                            </li>
                            <li>
                                <Link >Logout</Link >
                            </li>
                        </ul>
                    </li>
                    <li className={classes["li_dropdown"]}>
                        <FaCartPlus onClick={onCartClicked} />
                    </li>
                    <li className={classes["li_dropdown"]}>
                        <FaUser />
                        <ul>
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
                    </li>

                </ul>
            </nav>
        </header>
    );

}

export default MainNavigation