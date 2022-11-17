import React from 'react'
import { Link } from 'react-router-dom';
import classes from './LeftMenu.module.css';

function LeftMenu() {
    return (
        <div>
            <details>
                <summary></summary>
                <nav className={classes.menu}>
                    <Link to='/account'>Account</Link>
                    <Link to='/'>Detail</Link>
                    <Link to='/'>Detail</Link>
                </nav>
            </details>

        </div>
    )
}

export default LeftMenu