import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi';
import CartContext from '../../../context/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';
function Cart() {
  const cartCtx = useContext(CartContext);
  const [hover, setHover] = useState(false);
  const [classValue, setClassValue] = useState();

  const onHoverHandler = event => {
    setHover(true);
  }
  const onHoverLeaveHandler = event => {
    setHover(false);
  }
  useEffect(() => {
    const classtmp = hover ? `${classes.hidden_cart_container} ${classes.hidden_cart_container_enable}` : `${classes.hidden_cart_container}`;
    setClassValue(classtmp);
  }, [hover]);
  return (
    <div className={classes.cart_container}>
      <div className={`action_item ${classes.cart}`}
        onMouseEnter={onHoverHandler}
        onMouseLeave={onHoverLeaveHandler}>
        <HiOutlineShoppingBag className='icon' />
      </div>
      <div className={classes.hidden_cart_container}>
        <div className={classes.hidden_cart}>
          {cartCtx.items.length === 0 && <span>Hiện chưa có sản phẩm nào</span>}
          {cartCtx.items.length !== 0 &&
            <div>
              {cartCtx.items.map(item => { return <CartItem key={item.id} item={item} /> })}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Cart