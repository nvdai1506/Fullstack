import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GrStar } from 'react-icons/gr';
import { BsTelephoneInbound, BsTruck, BsClock } from 'react-icons/bs';
import classes from './ProductDetails.module.css';
import SizeList from './SizeList';

import Api from '../../service/api';
import CartContext from '../../context/cart-context';
import StatusContext from '../../context/status-context';
function ProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [product, setProduct] = useState({});

    const cartCtx = useContext(CartContext);
    const statusCtx = useContext(StatusContext);
    const [amount, setAmount] = useState(1);
    const [currentSize, setcurrentSize] = useState(null);
    useEffect(() => {
        Api.shop.getProduct(productId)
            .then(result => { return result.json() })
            .then(data => {
                setProduct(data.product);
            })
            .catch(err => {
                navigate('/error')
            })
    }, [location.pathname]);

    const receiveCurrentSize = size => {
        setcurrentSize(size);
    }
    const onAmountChangeHandler = event => {
        setAmount(event.target.value);
    }
    const onMinus = event => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    }
    const onPlus = event => {
        setAmount(amount + 1);
    }
    const onClickAddToCart = () => {
        // console.log(currentSize);
        // console.log(amount);
        if (currentSize) {
            cartCtx.addItem({
                id: product._id,
                title: product.title,
                imageUrl: product.imageUrl,
                price: product.price,
                size: currentSize,
                amount: Number(amount)
            });
            statusCtx.setValue('success', 'Thêm sản phẩm vào giỏ hàng thành công.')

        } else {
            statusCtx.setValue('info', 'Vui lòng chọn Size trước khi thêm vào giỏ hàng!')
        }
    }
    return (
        <>
            <div className={`${classes.product_detail_container}`}>
                <div className={classes.image}>
                    <img crossOrigin='true' src={`${process.env.REACT_APP_DOMAIN}/${product.imageUrl}`} alt={product.title} />
                </div>
                <div className={classes.info}>
                    <h1 className={classes.title}>{product.title}</h1>
                    <div className={classes.evaluation}>
                        <GrStar className={classes.star_icon} />
                        <GrStar className={classes.star_icon} />
                        <GrStar className={classes.star_icon} />
                        <GrStar className={classes.star_icon} />
                        <GrStar className={classes.star_icon} />
                        <span className={classes.number_star}>(5)</span>
                        <span className={classes.product_sold}>Đã bán: {product.totalSoldProducts}</span>
                    </div>
                    {product.price &&

                        <span className={classes.price}>{product.price.toLocaleString()}đ</span>
                    }
                    {product.size &&
                        <>
                            <label className={classes.size_label}>Chọn Kích thước: </label>
                            <div className={classes.size}>
                                <SizeList sizes={product.size} receiveCurrentSize={receiveCurrentSize} />

                            </div>
                        </>
                    }
                    <div className={`grid grid--3-cols ${classes.actions}`}>
                        <div className={classes.amount_action}>
                            <span className={classes.minus} onClick={onMinus}>-</span>
                            <input className={classes.amount} type='number' min='1' value={amount} onChange={onAmountChangeHandler} />
                            <span className={classes.plus} onClick={onPlus}>+</span>
                        </div>
                        <button className={classes.add_to_cart} onClick={onClickAddToCart}>Thêm Vào Giỏ Hàng</button>
                    </div>
                    <hr />
                    <div className={`grid grid--3-cols ${classes.services}`}>
                        <div className={classes.service}>
                            <div className={classes.icon}>
                                <BsTruck />
                            </div>
                            <div className={classes.text}>
                                <span>Miễn phí vận chuyển <br />cho đơn hàng trên 300.000đ </span>
                            </div>
                        </div>
                        <div className={classes.service}>
                            <div className={classes.icon}>
                                <BsTelephoneInbound />
                            </div>
                            <div className={classes.text}>
                                <span>Hotline: 1900.10.10.10</span>
                            </div>
                        </div>
                        <div className={classes.service}>
                            <div className={classes.icon}>
                                <BsClock />
                            </div>
                            <div className={classes.text}>
                                <span>Giao hàng nhanh toàn quốc </span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={classes.description}>
                        <h3 className={classes.hightligh}>Đặc điểm nổi bật </h3>
                        <ul className={classes.hightligh_list}>
                            <li>Chất liệu: 80% Cotton - 20% Recycle Polyester</li>
                            <li>Là sản phẩm của sự hợp tác giữa Coolmate và Disney - đơn vị sở hữu bản quyền Marvel. Chiếc áo thun có thành phần là sợi tái chế tại Việt Nam, hướng tới sự bền vững trong ngành may mặc.</li>
                            <li>Mềm mại, bền dai, không bai, nhão, xù lông và không gây khó chịu khi mặc</li>
                            <li>Chất liệu co giãn 4 chiều đem lại sự thoải mái suốt ngày dài</li>
                            <li>Đây là sản phẩm thời trang đi theo hướng bền vững, thân thiện hơn với môi trường</li>
                        </ul>
                    </div>
                    {/* <p className={classes.material}>{product.material}</p>
                <p className={classes.description}>{product.description}</p> */}
                </div>
            </div>
            {/* <hr />
            <h1 className={classes.title_detail}>Chi tiết Sản Phẩm</h1> */}
        </>
    )
}

export default ProductDetails