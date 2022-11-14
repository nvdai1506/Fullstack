import React, { useContext, useEffect, useState } from 'react'

import classes from './Product.module.css';
import Api from '../service/api';
import ProductContext from '../context/product-context';

import StatusMess from '../components/ui/StatusMess';
import ProductForm from '../components/product/ProductForm';
import ProductList from '../components/product/ProductList';
import Search from '../components/ui/Search';

import { AgGridReact } from 'ag-grid-react';



function Product() {
  const productCtx = useContext(ProductContext);
  const { productStatus, productStatusHandler, } = productCtx;
  const [listProducts, setListProducts] = useState([]);
  const [selectValues, setSelectValues] = useState();
  const [enteredSearch, setentEredSearch] = useState('');
  const searchHandler = event => {
    setentEredSearch(event.target.value);
  };


  useEffect(() => {
    Api.shop.getCatalog()
      .then(result => {
        return result.json();
      })
      .then(data => {
        setSelectValues(data.catalogs);
      })
      .catch(err => {
        productStatusHandler({ error: 'Could not load Catalog!' });
      }
      );
  });

  useEffect(() => {
    console.log('product');
    Api.shop.getProducts()
      .then(result => {
        return result.json();
      })
      .then(data => {
        setListProducts(data.products);
      })
      .catch(err => {
        productStatusHandler({ error: 'Could not load Products!' });
      }
      );
  }, [productStatus, productStatusHandler]);

  let listProductsFiltered = listProducts;
  if (enteredSearch !== '') {
    listProductsFiltered = listProducts.filter(product => product.title.toLowerCase().includes(enteredSearch.toLowerCase()));
  }

  return (
    <div className={classes.main}>
      <div className={classes.status}>
        {productStatus.error && <StatusMess state='error'>{productStatus.error}</StatusMess>}
        {productStatus.success && <StatusMess state='success'>{productStatus.success}</StatusMess>}
      </div>
      <div className={classes.form}>
        {selectValues && <ProductForm selectValues={selectValues} />}

      </div>
      <div className={classes.search}>
        <Search onChange={searchHandler} />
      </div>
      <div className={classes.list}>
        <ProductList products={listProductsFiltered} />
      </div>
    </div>

  )
}

export default Product