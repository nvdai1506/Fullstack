import React, { useContext } from 'react'
import classes from './CartList.module.css';
import CartItem from './CartItem';

import CartContext from '../../context/cart-context';

function CartList() {
  const cartCtx = useContext(CartContext);
  let classValue = classes.cart_list_container;
  if (cartCtx.items.length === 0) {
    classValue += ` ${classes.no_cart_list_container}`
  }

  return (
    <div className={classes.container}>
      <div className={classValue}>
        {cartCtx.items.length === 0 && <p className={classes.no_product}>Hiện tại bạn chưa có sản phẩm nào trong giỏ hàng.</p>}
        {cartCtx.items.map(item => <CartItem key={`${item.id}${item.size}`} item={item} />)}

      </div>
      {cartCtx.totalPrice !== 0 &&
        <div className={classes.totalPrice}>
          <hr className={classes.separate} /><br />
          <label className={classes.label_total}>Tổng tiền:</label>
          <span className={classes.totalPrice_span}>
            {cartCtx.totalPrice.toLocaleString()} đ
          </span>
        </div>
      }

    </div>
  )
}

export default CartList