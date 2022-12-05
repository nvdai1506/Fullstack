import React, { useContext } from 'react'
import classes from './CartItem.module.css';
import CartContext from '../../context/cart-context';
function CartItem({ id, title, image, price, amount }) {
  const cartCtx = useContext(CartContext);

  const addItemHandler = () => {
    cartCtx.addItem({ id, title, image, price, amount: 1 })
  }
  const removeItemHandler = () => {
    cartCtx.removeItem(id)
  }
  return (
    <div>
      <h1>{title}</h1>
      <h2>Price: {price}</h2>
      <h2>Amount: {amount}</h2>
      <button onClick={addItemHandler}>+</button>
      <button onClick={removeItemHandler}>-</button>
    </div>
  )
}

export default CartItem