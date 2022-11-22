import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from './MainNavigation.module.css';
import AuthContext from "../../context/auth-context";


function MainNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    // console.log(isLoggedIn);

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/login');
    }
    return (
        <header className={classes.headerNav}>
            <div className={classes.logo}>Shop</div>
            <nav>
                <ul>
                    {!isLoggedIn &&
                        <li>
                            <Link to='/login' className={classes[`${location.pathname === '/login' ? 'active' : ''}`]}>Login</Link>
                        </li>
                    }
                    {isLoggedIn &&
                        <li onClick={logoutHandler}>
                            Logout
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );
    
}

export default MainNavigation