import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import classes from './ProductDetails.module.css';

import Api from '../../service/api';
function ProductDetails() {
    const location = useLocation();
    const {productId} = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        Api.shop.getProduct(productId)
        .then(result => {return result.json()})
        .then(data => {
            setProduct(data.product);
        })
    }, []);
    return (
        <div>
            <h1>{product.title}</h1>
            <h1>{product.description}</h1>
            <h1>{product.imageUrl}</h1>
            <h1>{product.material}</h1>
            <h1>{product.size}</h1>
            <h1>{product.price}</h1>
        </div>
    )
}

export default ProductDetails