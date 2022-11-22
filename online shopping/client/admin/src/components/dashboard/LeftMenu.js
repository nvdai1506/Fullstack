import React from 'react'
import { Link } from 'react-router-dom';
import classes from './LeftMenu.module.css';

function LeftMenu({role}) {
    return (
        <div>
            <details>
                <summary></summary>
                <nav className={classes.menu}>
                    {role===1 && <Link to='/account'>Account</Link>}
                    <Link to='/details'>Details</Link>
                    <Link to='/history'>History</Link>
                </nav>
            </details>

        </div>
    )
}

export default LeftMenu