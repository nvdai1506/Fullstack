import React, { useEffect, useState } from 'react'
import classes from './ListProduct.module.css';
import ProductItem from './ProductItem';

function ListProduct({ listProduct }) {
    // console.log(listProduct);
    return (
        <div className={`grid grid--5-cols grid--big-gap ${classes.list_product}`}>
            {listProduct.map(p => <ProductItem key={p._id} product={p} />)}
        </div>
    )
}

export default ListProduct