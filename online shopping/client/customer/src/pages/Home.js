import React from 'react'
import classes from './Home.module.css';

import ListProduct from '../components/product/ListProduct';

function Home() {
  return (
    <div className={classes.main}>
      <ListProduct />
    </div>
  )
}

export default Home