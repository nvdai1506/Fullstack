import React, { useContext } from 'react'
import classes from './CartList.module.css';
import CartItem from './CartItem';

import CartContext from '../../context/cart-context';

function CartList() {
  const cartCtx = useContext(CartContext);

  return (
    <div>
      {cartCtx.items.map(item => <CartItem key={item.id} id={item.id} title={item.title} image={item.imageUrl} price={item.price} amount={item.amount} />)}
      {cartCtx.totalPrice}
    </div>
  )
}

export default CartList