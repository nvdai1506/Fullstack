import React from 'react'
import { useNavigate } from 'react-router-dom';
import classes from '../../cart/CartItem.module.css';
import order_classes from './OrderHistoryItem.module.css';

function OrderHistoryItem({ item }) {
  const navigate = useNavigate();
  const { id, title, imageUrl, size, price, amount } = item;

  const onClickTitleHandler = () => {
    navigate(`/product/${id}`)
  }
  return (
    <div className={classes.cart_item_container}>
      <div className={`grid grid--4-cols ${classes.cart_item}`}>
        <div className={classes.image + ` ${order_classes.image}`}>
          <img crossOrigin='true' src={`${process.env.REACT_APP_DOMAIN}/${imageUrl}`} alt={title} />
        </div>
        <div className={classes.textbox}>
          <h1 className={classes.title + ` ${order_classes.title}`} onClick={onClickTitleHandler}>{title}</h1>
          <p className={classes.size + ` ${order_classes.size}`}>{size}</p>
          <p className={classes.price + ` ${order_classes.price}`}>Price: <strong>{price.toLocaleString()} đ</strong></p>
          <p className={classes.amount + ` ${order_classes.amount}`}>&times;<strong>{amount}</strong></p>

        </div>
        <div className={classes.total_item + ` ${order_classes.total_item}`} >{(price * amount).toLocaleString()} đ</div>
      </div>
    </div>
  )
}

export default OrderHistoryItem