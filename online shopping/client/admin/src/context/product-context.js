import React, { useState } from "react";


const ProductContext = React.createContext({
    // product
    selectValues: {},
    productStatus: {},
    productEditValue: {},
    productEditHandler: () => { },
    productStatusHandler: () => { },
    selectHandler: () => { }
});

export const ProductContextProvider = (props) => {

    // product
    const [productStatus, setProductStatus] = useState({});
    const [productEditValue, setProductEditValue] = useState({});
    const [selectValues, setSelectValues] = useState({});


    const productStatusHandler = (value) => {
        setProductStatus(value);
    };
    const productEditHandler = (value) => {
        setProductEditValue(value);
    };
    const selectHandler = value =>{
        setSelectValues(value);
    }

    const contextValues = {
        // product
        selectValues:selectValues,
        productStatus: productStatus,
        productEditValue: productEditValue,
        productEditHandler: productEditHandler,
        productStatusHandler: productStatusHandler,
        selectHandler:selectHandler
    }
    return (
        <ProductContext.Provider value={contextValues}>
            {props.children}
        </ProductContext.Provider>
    );
}

export default ProductContext;