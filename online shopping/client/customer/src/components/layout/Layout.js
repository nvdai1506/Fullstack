import React, { Fragment } from 'react'
import MainNavigation from './MainNavigation'

import './Layout.module.css';
import StatusMessTimer from '../status/StatusMessTimer';
import Footer from './Footer';


function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <StatusMessTimer />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  )
}

export default Layout