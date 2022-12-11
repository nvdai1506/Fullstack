import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import classes from './Home.module.css';
import Api from '../service/api';
import ListProduct from '../components/product/ListProduct';

function Home() {
  const [clothes, setClothes] = useState([]);
  const [pants, setPants] = useState([]);
  useEffect(() => {
    // get clothes
    Api.shop.getProductByType('ao?level=1')
      .then(result => { return result.json() })
      .then(data => {
        setClothes(data.product);
      })
    // get pants
    Api.shop.getProductByType('quan?level=1')
      .then(result => { return result.json() })
      .then(data => {
        setPants(data.product);
      })
  }, []);
  return (
    <div className={classes.home_container}>
      <div className={classes.container}>
        <h1 className={classes.title}>Áo</h1>
        <hr className={classes.seperate} />

        <ListProduct listProduct={clothes.slice(0, 10)} />
        <Link to='/shop/ao' className={classes.more}>Xem thêm sản phẩm</Link>

      </div>
      <div className={classes.container}>
        <h1 className={classes.title}>Quần</h1>
        <hr className={classes.seperate} />

        <ListProduct listProduct={pants.slice(0, 10)} />
        <Link to='/shop/ao' className={classes.more}>Xem thêm sản phẩm</Link>
      </div>
    </div>
  )
}

export default Home