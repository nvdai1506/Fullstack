import React from 'react'
import { Link } from 'react-router-dom';
import classes from './ProductItem.module.css';
import { FaCartArrowDown } from 'react-icons/fa';

function ProductItem({ id, title, imageUrl }) {
    return (
        <div className={classes.product_item}>
            <Link to={`/product/${id}`}>
                <img crossOrigin='true' src={`${process.env.REACT_APP_DOMAIN}/${imageUrl}`} alt='' />
            </Link>
            <button>
                <FaCartArrowDown size='2rem'/>
            </button>
            <h2>{title}</h2>
        </div>
    )
}

export default ProductItem