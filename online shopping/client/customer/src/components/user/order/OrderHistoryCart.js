import React from 'react'

import classes from './OrderHistoryCart.module.css';
import OrderHistoryItem from './OrderHistoryItem';

function OrderHistoryCart({ order }) {
  const { cart, createdAt, updatedAt, status, shippingStatus, _id, percent, vnd, total } = order;
  const { items, totalPrice } = cart;

  return (
    <div className={classes.order_history_cart}>
      {items.map(item => { return <OrderHistoryItem key={order._id + item.id + item.size} item={item} orderId={_id} order_status={status} shippingStatus={shippingStatus} /> })}
      <div className={classes.hr}>
        <hr />
      </div>
      <div className={classes.textbox}>
        <div className={classes.textbox_item}>
          <label>Tạm tính</label>
          <span>{totalPrice.toLocaleString()} đ</span>
        </div>
        <div className={classes.textbox_item}>
          <label>Giảm giá</label>
          {percent !== 0 &&
            <span>- {percent}%</span>
          }
          {vnd !== 0 &&
            <span>- {vnd.toLocaleString()}đ</span>
          }
          {vnd === 0 && percent === 0 &&
            <span>0</span>
          }
        </div>
        <div className={classes.textbox_item}>
          <label>Phí vận chuyển</label>
          <span>Miễn phí</span>
        </div>
        <hr />
        <div className={classes.textbox_item}>
          <label className={classes.textbox_label}>Ngày đặt: </label>
          <p className={classes.date}>{createdAt.split('T')[0]}</p>
        </div>
        <div className={classes.textbox_item}>

          <label className={classes.textbox_label}>Ngày Giao hàng: </label>
          <p className={classes.date}>
            <span className={status === 1 && shippingStatus === 1 ? classes.status_sucess : (status === 2 ? classes.status_canceled : classes.status_processing)}>
              {(status === 1 && shippingStatus === 1 && status !== 2) ? '(Thành Công) ' : (status === 2 ? '(Đã Huỷ) ' : 'Đang xử lý ')}
            </span>
            {createdAt !== updatedAt ? updatedAt.split('T')[0] : ''}
          </p>
        </div>

        <div className={classes.textbox_item}>
          <label className={classes.textbox_label}>Tổng tiền: </label>
          <p className={classes.total}><strong>{total.toLocaleString()}đ</strong></p>
        </div>
      </div>
    </div >
  )
}

export default OrderHistoryCart