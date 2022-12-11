import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from './OrderForm.module.css';
import { TbTruckDelivery } from 'react-icons/tb';
import logomomo from '../../images/logo-momo.jpg';
import vnpay from '../../images/vnpay.png';
import AuthConText from '../../context/auth-context';
import CartContext from '../../context/cart-context';
import useInput from '../../hooks/use-input';
import Api from '../../service/api';
import StatusContext from '../../context/status-context';
function OrderForm() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthConText);
  const { isLoggedIn } = authCtx;
  const cartCtx = useContext(CartContext);
  const statusCtx = useContext(StatusContext);
  const [clickForm, setClickForm] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');

  const {
    value: enteredName,
    valueChangeHandler: nameInputChangeHandler,
    setValue: setEnteredName,
    hasError: nameInputHasError
  } = useInput(value => value.trim() !== '');
  const {
    value: enteredPhone,
    valueChangeHandler: phoneInputChangeHandler,
    setValue: setEnteredPhone,
    hasError: phoneInputHasError
  } = useInput(value => value.trim() !== '');
  const {
    value: enteredAddress,
    valueChangeHandler: addressInputChangeHandler,
    setValue: setEnteredAddress,
    hasError: addressInputHasError
  } = useInput(value => value.trim() !== '');
  const {
    value: enteredNote,
    valueChangeHandler: noteInputChangeHandler,
  } = useInput(() => { });

  useEffect(() => {
    if (isLoggedIn) {
      Api.user.getUser()
        .then(result => { return result.json() })
        .then(data => {
          setEnteredName(data.user.name);
          setEnteredPhone(data.user.phone);
          setEnteredEmail(data.user.email);
          setEnteredAddress(data.user.address);
        })
        .catch(err => {
          navigate('/error');
        })
    }
  }, []);
  const onSubmitOrderHandler = event => {
    event.preventDefault();
    if (nameInputHasError || phoneInputHasError || addressInputHasError) {
      statusCtx.setValue('validation', 'Thông tin vận chuyển không hợp lệ.');
      setClickForm(true);
      return;
    }
    const shippingInfo = {
      name: enteredName,
      phone: enteredPhone,
      email: enteredEmail,
      address: enteredAddress,
      note: enteredNote,
    };
    const cart = {
      items: cartCtx.items,
      totalPrice: cartCtx.totalPrice,
      totalAmount: cartCtx.totalAmount
    }
    Api.shop.postOrder({ shippingInfo: shippingInfo, cart: cart })
      .then(result => { return result.json() })
      .then(data => {
        statusCtx.setValue('success', 'Bạn đã đặt hàng thành công.');
        cartCtx.clearCart();
      })
      .catch(err => {
        navigate('/error');
      })
  }

  return (
    <div className={classes.order_container}>
      <div className={`grid grid--2-cols ${classes.shipping_info}`}>
        <h1 className={classes.title}>Thông tin vận chuyển</h1>
        <div className={classes.login}>
          {!authCtx.isLoggedIn &&
            <>
              <span>Bạn đã có tài khoản?</span>
              <Link className={classes.login_link} to='/login'>Đăng nhập ngay</Link>
            </>
          }
        </div>
        <form className={`grid grid--2-cols ${classes.form}`}>
          <input className={`${(nameInputHasError && clickForm) ? `${classes.form_input_not_valid} ${classes.form_input}` : classes.form_input}`}
            placeholder='Họ tên' required value={enteredName} onChange={nameInputChangeHandler} />

          <input className={`${(phoneInputHasError && clickForm) ? `${classes.form_input_not_valid} ${classes.form_input}` : classes.form_input}`}
            placeholder='Số Điện Thoại' required value={enteredPhone} onChange={phoneInputChangeHandler} />

          <input className={`${classes.form_input} ${classes.email_field}`} required value={enteredEmail} readOnly />

          <input className={`${(addressInputHasError && clickForm) ? `${classes.form_input_not_valid} ${classes.form_input}` : classes.form_input} ${classes.address}`}
            placeholder='Địa chỉ' required value={enteredAddress} onChange={addressInputChangeHandler} />

          <input className={`${classes.form_input} ${classes.note}`} placeholder='Ghi chú thêm' required value={enteredNote} onChange={noteInputChangeHandler} />
        </form>
      </div>
      <div className={`${classes.payments}`}>
        <h1 className={`${classes.title} ${classes.title_bottom}`}>Hình thức thanh toán</h1>
        <div className={classes.payment_option}>
          <input className={classes.radio} type='radio' />
          <TbTruckDelivery className={classes.delivery_icon} />
          <span className={classes.delivery_text}>Thanh toán khi nhận hàng</span>
        </div>
        <div className={classes.payment_option}>
          <input className={classes.radio} type='radio' />
          <div className={classes.logo}>
            <img src={logomomo} alt='Logo momo' />
          </div>
          <span className={classes.delivery_text}>Thanh toán MoMo</span>
        </div>
        <div className={classes.payment_option}>
          <input className={classes.radio} type='radio' />
          <div className={classes.logo}>
            <img src={vnpay} alt='Logo vnpay' />
          </div>
          <span className={classes.delivery_text}>Thanh toán ATM/Internet banking</span>
        </div>
        <button className={classes.payment_btn} onClick={onSubmitOrderHandler}>Thanh Toán</button>
      </div>
    </div>
  )
}

export default OrderForm