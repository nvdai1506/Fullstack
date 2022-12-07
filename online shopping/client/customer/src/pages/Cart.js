import React from 'react'

import classes from './Cart.module.css';
import CartList from '../components/cart/CartList';
import OrderForm from '../components/order/OrderForm';
function Cart() {
  return (
    <div className='container'>
      <div className={`grid grid--2-cols ${classes.cart_container}`}>
        <OrderForm />
        <CartList />
      </div>
    </div>
  )
}

export default Cart