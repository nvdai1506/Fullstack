import React from 'react'

import classes from './OrderHistoryCart.module.css';
import OrderHistoryItem from './OrderHistoryItem';

function OrderHistoryCart({ order }) {
  const { cart, createdAt, updatedAt, status } = order;
  const { items, totalPrice } = cart;

  return (
    <div className={classes.order_history_cart}>
      {items.map(item => { return <OrderHistoryItem key={order._id + item.id + item.size} item={item} /> })}
      <div className={classes.hr}>
        <hr />
      </div>
      <div className={classes.textbox}>
        <label>Ngày đặt: </label>
        <p className={classes.date}>{createdAt.split('T')[0]}</p>
        <label>Ngày Giao hàng: </label>
        <p className={classes.date}>{createdAt !== updatedAt ? updatedAt.split('T')[0] : ''}
          <span className={status === 1 ? classes.status_sucess : classes.status_canceled}>
            {(status === 1 && status !== 2) ? ' (Thành Công)' : (status === 2 ? ' (Đã Huỷ)' : '')}
          </span></p>
        <label>Tổng tiền: </label>
        <p className={classes.total}>{totalPrice.toLocaleString()}đ</p>
      </div>
    </div>
  )
}

export default OrderHistoryCart