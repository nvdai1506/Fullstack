import React, { useEffect, useState } from 'react'
import classes from './Order.module.css';

import StatusMess from '../ui/StatusMess';
import OrderItem from './OrderItem';
import Api from '../../service/api';

function Order() {
    const [orderingList, setOrderingList] = useState([]);
    const [orderedList, setOrderedList] = useState([]);

    const [error, setError] = useState(false);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        Api.admin.getOrders(0)
            .then(result => { return result.json() })
            .then(data => {
                setOrderingList(data.orders);
                console.log(data.orders);
            })
            .catch(err => {
                setError(true);
            });
        Api.admin.getOrders(1)
            .then(result => { return result.json() })
            .then(data => {
                setOrderedList(data.orders);
            })
            .catch(err => {
                setError(true);
            });
    }, [status])
    const statusChangeHandler = (value) => {
        setStatus(!status);
        setError(value);
    }
    return (
        <div className={classes.main}>
            <div className={classes.status}>
                {error && <StatusMess state='error'>Something wrong!</StatusMess>}
            </div>
            <div className={classes.show}>
                <div className={classes.ordering}>
                    <h1>Ordering</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th className={classes.ordered_titles_orderId}>Id</th>
                                <th className={classes.ordered_titles_email}>Email</th>
                                <th className={classes.ordered_titles_action}></th>
                            </tr>
                            {orderingList.map(order => <OrderItem statusChangeHandler={statusChangeHandler} main='ordering' key={order._id} id={order._id} email={order.email} />)}
                        </tbody>
                    </table>
                </div>
                <div className={classes.ordered}>
                    <h1>Ordered</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th className={classes.titles_orderId}>Id</th>
                                <th className={classes.titles_email}>Email</th>
                            </tr>
                            {orderedList.map(order => <OrderItem statusChangeHandler={statusChangeHandler}  main='ordered' key={order._id} id={order._id} email={order.email} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Order