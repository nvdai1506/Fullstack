import React from 'react'

import classes from './Dashboard.module.css';
import Menu from './Menu';

function Dashboard() {
  return (
    <div className={classes.main}>
        <div className={classes.menu}>
            <Menu/>
        </div>
        <div className={classes.overview}>Overview</div>
    </div>
  )
}

export default Dashboard