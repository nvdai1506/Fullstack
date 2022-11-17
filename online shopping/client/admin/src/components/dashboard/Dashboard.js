import React from 'react'

import classes from './Dashboard.module.css';
import Menu from './Menu';
import OverviewChart from './OverviewChart';
import LeftMenu from './LeftMenu';
function Dashboard() {
  return (
    <div className={classes.main}>
      <div className={classes.menu}>
        {/* <Menu /> */}
        <LeftMenu/>
      </div>
      <div className={classes.overview}>
        <OverviewChart />
      </div>
    </div>
  )
}

export default Dashboard