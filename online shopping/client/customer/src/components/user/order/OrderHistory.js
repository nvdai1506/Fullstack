import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../../service/api';
import classes from './OrderHistory.module.css';
import OrderHistoryCart from './OrderHistoryCart';

function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    Api.user.getOrders()
      .then(result => { return result.json() })
      .then(data => {
        // console.log(data);
        setOrders(data.orders);
      })
      .catch(err => {
        navigate('/error');
      })
  }, []);
  return (
    <div className={classes.order_list_container}>
      {orders.length === 0 && <p className={classes.no_product}>Bạn chưa có đơn hàng nào...</p>}
      {orders.map(order => <OrderHistoryCart key={order._id} order={order} />)}
    </div>
  )
}

export default OrderHistory