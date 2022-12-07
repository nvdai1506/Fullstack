import React, { useContext, useEffect, useState } from 'react'
import './CartItem.module.css';
import CartContext from '../../context/cart-context';
import classes from './CartItem.module.css';
import { AiOutlineClose } from 'react-icons/ai';

function CartItem({ item }) {
  const { id, title, size, imageUrl, price, amount } = item;
  const cartCtx = useContext(CartContext);
  const [currentAmount, setCurrentAmount] = useState(amount);

  const addItemHandler = () => {
    cartCtx.addItem({ id, title, imageUrl, price, amount: 1, size });
    setCurrentAmount(currentAmount + 1);
  }
  const removeItemHandler = () => {
    if (currentAmount === 1 || currentAmount < 1) {
      cartCtx.clearItem(id, size);
    } else {
      cartCtx.removeItem(id, size)
      setCurrentAmount(currentAmount - 1);

    }
  }
  const onAmountChangeHandler = event => {
    setCurrentAmount(event.target.value);
  }
  const onClearItemHandler = () => {
    cartCtx.clearItem(id, size);
  }
  return (
    <div className={classes.cart_item_container}>
      <div className={`grid grid--4-cols ${classes.cart_item}`}>
        <div className={classes.image}>
          <img crossOrigin='true' src={`${process.env.REACT_APP_DOMAIN}/${imageUrl}`} alt={title} />
        </div>
        <div className={classes.textbox}>
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.size}>{size}</p>
          <p className={classes.price}>Price: <strong>{price.toLocaleString()} đ</strong></p>
          <p className={classes.amount}>&times;<strong>{amount}</strong></p>
          <div className={classes.amount_action}>
            <span className={classes.minus} onClick={removeItemHandler}>-</span>
            <input className={classes.amount_input} type='number' min='1' value={currentAmount} onChange={onAmountChangeHandler} />
            <span className={classes.plus} onClick={addItemHandler}>+</span>
          </div>
          <div className={classes.close}>
            <AiOutlineClose className={classes.icon_close} onClick={onClearItemHandler} />
          </div>
        </div>
        <div className={classes.total_item}>{(price * amount).toLocaleString()} đ</div>
      </div>
    </div>
  )
}

export default CartItem