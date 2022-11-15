
import React,{useContext, useCallback} from 'react'
import Button from '../ui/Button'
import Api from '../../service/api';
import classes from './DeleteBtn.module.css';

import ProductContext from '../../context/product-context';

const DeleteBtn = (props) => {
    const productCtx = useContext(ProductContext);

    const onDelete = () => {
        console.log(props.data._id);
        Api.admin.deletetProduct(props.data._id)
            .then(result => {
                return result.json();
            })
            .then(data => {
                productCtx.productStatusHandler({ success: "You have successfully deleted product." })
            })
            .catch(err => {
                productCtx.productStatusHandler({ error: "Could not delete Product!" })
            });
    };
    
    return <Button onClick={onDelete} className={`${classes.btn} ${classes.delete}`}>Delete</Button>
}

export default DeleteBtn;