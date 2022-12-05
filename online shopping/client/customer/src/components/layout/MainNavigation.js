import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from './MainNavigation.module.css';
import AuthContext from "../../context/auth-context";
import { FaBars } from 'react-icons/fa';
import './MainNavigation.css';
import Search from "../header/action/Search";

import Logo from '../../images/NVD-192.png';
import Ul from "./ul/Ul";
import Cart from "../header/action/Cart";
import User from "../header/action/User";

function MainNavigation() {
    const navigate = useNavigate();
    const onCartClicked = () => {
        navigate('/cart');
    }
    return (
        <header className={classes.header}>
            <div className={classes.logo_container}>
                <Link to='/'>
                    <img className={classes.logo} src={Logo} alt="VD Logo" />
                </Link>
            </div>
            <div className={classes.menu}>
                <div className={classes.menu_item}>
                    <FaBars className={classes.menu_icon} />
                    <div className={classes.menu_hide}>
                        <div className={classes.menu_hide_container}>

                            <nav className={`grid grid--4-cols grid--big-gap ${classes.nav}`}>
                                <Ul parent={{ link: '/', text: 'Áo' }}
                                    childList={
                                        [
                                            { key: 'a1', link: '/', text: 'Áo Thun' },
                                            { key: 'a2', link: '/', text: 'Áo Khoác' },
                                            { key: 'a3', link: '/', text: 'Áo Sơ Mi' },
                                            { key: 'a4', link: '/', text: 'Áo Ba Lỗ' },

                                        ]
                                    } />
                                <Ul parent={{ link: '/', text: 'Quần' }}
                                    childList={
                                        [
                                            { key: 'q1', link: '/', text: 'Quần Tây' },
                                            { key: 'q2', link: '/', text: 'Quần Jean' },
                                            { key: 'q3', link: '/', text: 'Quần Short' },
                                            { key: 'q4', link: '/', text: 'Áo Ba Lỗ' },

                                        ]
                                    } />
                                <Ul parent={{ link: '/', text: 'Phụ Kiện' }}
                                    childList={
                                        [
                                            { key: 'pk1', link: '/', text: 'Nón' },
                                            { key: 'pk2', link: '/', text: 'Thắt Lưng' },
                                            { key: 'pk3', link: '/', text: 'Bao lô - Túi' },

                                        ]
                                    } />
                                <Ul parent={{ link: '/', text: 'Giày-Dép' }}
                                    childList={
                                        [
                                            { key: 'gd1', link: '/', text: 'Sandals' },
                                            { key: 'gd2', link: '/', text: 'Giày Tây' },
                                            { key: 'gd3', link: '/', text: 'Giày Thể thao' },


                                        ]
                                    } />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.actions}>
                <Search />
                <Cart />
                <User />
            </div>
        </header>
    );

}

export default MainNavigation