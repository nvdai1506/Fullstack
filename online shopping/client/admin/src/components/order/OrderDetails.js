import React from 'react'

import Modal from '../ui/Modal';
import classes from './OrderDetails.module.css';
import CartItem from './CartItem';

function OrderDetails(props) {
    console.log('details');
    const {items,total} = props.view;
    const cartItems = (
        <ul className={classes['cart-items']}>
            {items.map((item) => (
                <CartItem
                    key={item.product._id}
                    name={item.product.title}
                    quantity={item.quantity}
                    price={item.product.price}
                />
            ))}
        </ul>
    );
    return (
        <Modal className={classes.main} onClose={props.onClose} >
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{total} VNĐ</span>
            </div>
        </Modal>
    )
}

export default React.memo(OrderDetails);