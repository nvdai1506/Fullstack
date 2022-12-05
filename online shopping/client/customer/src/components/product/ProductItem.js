import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import classes from './ProductItem.module.css';
import { FaCartPlus } from 'react-icons/fa';
import CartContext from '../../context/cart-context';

function ProductItem({ id, title, price, imageUrl }) {
    const cartCtx = useContext(CartContext);

    const addToCartHandler = () => {
        cartCtx.addItem({
            id: id,
            title: title,
            imageUrl: `${process.env.REACT_APP_DOMAIN}/${imageUrl}`,
            price: price,
            amount: 1
        });
    }
    return (
        <div className={classes.product_item}>
            <Link to={`/product/${id}`}>
                <img crossOrigin='true' src={`${process.env.REACT_APP_DOMAIN}/${imageUrl}`} alt='' />
            </Link>
            <button onClick={addToCartHandler}>
                <FaCartPlus size='2rem' />
            </button>
            {/* <h2>{title}</h2> */}
        </div>
    )
}

export default ProductItem