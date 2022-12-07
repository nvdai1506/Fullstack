import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from './ProductItem.module.css';
import Size from './Size';
import { GrStar } from 'react-icons/gr';
function ProductItem({ product }) {
    const navigate = useNavigate();
    const onClickTextBoxHandler = () => {
        navigate(`/product/${product._id}`);
    }

    return (
        <div className={classes.product_item}>
            <div className={classes.img_box}>
                <Link to={`/product/${product._id}`}>
                    <img crossOrigin='true' src={`${process.env.REACT_APP_DOMAIN}/${product.imageUrl}`} alt={product.title} />
                </Link>
                <div className={classes.size_container}>
                    {product.size.split(' ').map(size => {
                        return <Size key={size} size={size} product={product} />;
                    })}
                </div>
                <div className={classes.evaluation}>
                    <span className={classes.start_number}>
                        4.9
                    </span>
                    <GrStar className={classes.start_icon} />
                    <span className={classes.number_evaluation}>(333)</span>

                </div>
                {product.title.toLowerCase().includes('áo sơ mi') &&

                    <div className={classes.sale}>
                        <span className={classes.sale_box}>Sale</span>
                    </div>
                }
            </div>
            <div className={classes.textbox} onClick={onClickTextBoxHandler}>
                <h2 className={classes.title}>{product.title}</h2>
                <span className={classes.price}>{product.price.toLocaleString()}đ</span>
            </div>

        </div>
    )
}

export default ProductItem