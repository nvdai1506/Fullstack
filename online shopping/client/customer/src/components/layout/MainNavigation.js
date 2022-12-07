import { Link } from "react-router-dom";
import classes from './MainNavigation.module.css';
import { FaBars } from 'react-icons/fa';
import './MainNavigation.css';
import Search from "../header/action/Search";

import Logo from '../../images/NVD-192.png';
import Ul from "./ul/Ul";
import Cart from "../header/action/Cart";
import User from "../header/action/User";

function MainNavigation() {

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
                                <Ul parent={{ link: '/shop/ao', text: 'Áo' }}
                                    childList={
                                        [
                                            { key: 'a1', link: '/shop/ao-thun', text: 'Áo Thun' },
                                            { key: 'a2', link: '/shop/ao-khoac', text: 'Áo Khoác' },
                                            { key: 'a3', link: '/shop/ao-so-mi', text: 'Áo Sơ Mi' },
                                            { key: 'a4', link: '/shop/ao-ba-lo', text: 'Áo Ba Lỗ' },

                                        ]
                                    } />
                                <Ul parent={{ link: '/shop/quan', text: 'Quần' }}
                                    childList={
                                        [
                                            { key: 'q1', link: '/shop/quan-tay', text: 'Quần Tây' },
                                            { key: 'q2', link: '/shop/quan-jean', text: 'Quần Jean' },
                                            { key: 'q3', link: '/shop/quan-short', text: 'Quần Short' },
                                            { key: 'q4', link: '/shop/quan-jogger', text: 'Quần Jogger' },


                                        ]
                                    } />
                                <Ul parent={{ link: '/shop/phu-kien', text: 'Phụ Kiện' }}
                                    childList={
                                        [
                                            { key: 'pk1', link: '/shop/non', text: 'Nón' },
                                            { key: 'pk2', link: '/shop/that-lung', text: 'Thắt Lưng' },
                                            { key: 'pk3', link: '/shop/bao-lo-tui', text: 'Bao lô - Túi' },

                                        ]
                                    } />
                                <Ul parent={{ link: '/shop/giay-dep', text: 'Giày-Dép' }}
                                    childList={
                                        [
                                            { key: 'gd1', link: '/shop/sandals', text: 'Sandals' },
                                            { key: 'gd2', link: '/shop/giay-tay', text: 'Giày Tây' },
                                            { key: 'gd3', link: '/shop/giay-the-thao', text: 'Giày Thể thao' },


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