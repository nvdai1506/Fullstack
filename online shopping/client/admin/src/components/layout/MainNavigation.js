import { useContext } from "react";
import { Link,useHistory,useLocation } from "react-router-dom";
import classes from './MainNavigation.module.css';

import AuthContext from "../../context/auth-context";


function MainNavigation() {
    const history = useHistory();
    const location = useLocation();
    
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = ()=>{
        authCtx.logout();
        history.replace('/login');
    }
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Admin</div>
            <nav>
                <ul>
                    {isLoggedIn &&
                        <li>
                            <Link to='/' className={classes[`${ location.pathname==='/' ? 'active' : ''}`]}>Dashboard</Link>
                        </li>
                    }
                    {isLoggedIn &&
                        <li>
                            <Link to='/catalog' className={classes[`${ location.pathname==='/catalog' ? 'active' : ''}`]}>Catalog</Link>
                        </li>
                    }
                    {isLoggedIn &&
                        <li>
                            <Link to='/product' className={classes[`${ location.pathname==='/product' ? 'active' : ''}`]}>Product</Link>
                        </li>
                    }
                    {isLoggedIn &&
                        <li>
                            <Link to='/order' className={classes[`${ location.pathname==='/order' ? 'active' : ''}`]}>Order</Link>
                        </li>
                    }
                    {!isLoggedIn &&
                        <li>
                            <Link to='/login' className={classes[`${ location.pathname==='/login' ? 'active' : ''}`]}>Login</Link>
                        </li>
                    }
                    {isLoggedIn &&
                        <li>
                            <button className={classes.btn} onClick={logoutHandler}>Logout</button>
                        </li>
                    }


                </ul>

            </nav>
        </header>
    )
}

export default MainNavigation