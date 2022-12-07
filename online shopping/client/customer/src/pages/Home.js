import React, { useState, useEffect } from 'react'
import classes from './Home.module.css';

import Api from '../service/api';
import ListProduct from '../components/product/ListProduct';
function Home() {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    Api.shop.getProducts()
      .then(result => { return result.json() })
      .then(data => {
        setListProduct(data.products);
      })
  }, []);
  return (
    <div className={classes.main}>
      <ListProduct listProduct={listProduct} />
    </div>
  )
}

export default Home