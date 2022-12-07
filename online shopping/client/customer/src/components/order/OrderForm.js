import React from 'react'
import { Link } from 'react-router-dom';
import classes from './OrderForm.module.css';
import { TbTruckDelivery } from 'react-icons/tb';
import logomomo from '../../images/logo-momo.jpg';
import vnpay from '../../images/vnpay.png';
function OrderForm() {
  return (
    <div className={classes.order_container}>
      <div className={`grid grid--2-cols ${classes.shipping_info}`}>
        <h1 className={classes.title}>Thông tin vận chuyển</h1>
        <div className={classes.login}>
          <span>Bạn đã có tài khoản?</span>
          <Link className={classes.login_link} to='/login'>Đăng nhập ngay</Link>
        </div>
        <form className={`grid grid--2-cols ${classes.form}`}>
          <input className={classes.form_input} placeholder='Họ tên' />
          <input className={classes.form_input} placeholder='Số Điện Thoại' />
          <input className={`${classes.form_input} ${classes.address}`} placeholder='Địa chỉ' />
          <input className={`${classes.form_input} ${classes.note}`} placeholder='Ghi chú thêm' />
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
        <button className={classes.payment_btn}>Thanh Toán</button>
      </div>
    </div>
  )
}

export default OrderForm