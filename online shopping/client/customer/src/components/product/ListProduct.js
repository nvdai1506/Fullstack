import React, { useEffect, useState } from 'react'
import classes from './ListProduct.module.css';
import Api from '../../service/api';
import ProductItem from './ProductItem';

function ListProduct() {
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        Api.shop.getProducts()
        .then(result => {return result.json()})
        .then(data=>{
            setListProduct(data.products);
        })
    }, []);
    return (
        <div className={classes.list_product}>
            {listProduct.map(p => <ProductItem key={p._id} id={p._id} title={p.title} imageUrl={p.imageUrl}/>)}
        </div>
    )
}

export default ListProduct