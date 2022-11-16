import React, { useState, useRef, useMemo, useCallback, useContext, useEffect, memo } from 'react'
import { AgGridReact } from 'ag-grid-react';

import classes from './ProductList_Aggrid.module.css';
import ProductContext from '../../context/product-context';

import DeleteBtn from './DeleteBtn.js';

function ProductList_Aggrid(props) {
    const products = props.products;
    const productCtx = useContext(ProductContext);
    const { productEditHandler, productStatus } = productCtx;



    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [columnDefs] = useState([
        // { field: '_id' },
        { field: 'title' },
        // { field: 'imageUrl' },
        { field: 'material' },
        { field: 'size' },
        { field: 'price' },
        { field: 'description' },
        { field: '', cellRenderer: memo(DeleteBtn), resizable: null, cellStyle: { 'textAlign': 'center' } }
    ]);


    const onGridReady = useCallback(() => {
        // console.log('onGridReady');

        const ready = new Promise((resolve, reject) => {
            if (products.length > 0) {
                setRowData(products);
                return resolve();
            }
        });
        ready.then(() => {
            gridRef.current.api.sizeColumnsToFit(
                {
                    defaultMinWidth: 50,
                    columnLimits: [
                        { key: 'description', minWidth: 600 },
                        { key: 'title', minWidth: 250 },
                    ],
                }
            );
        });

    }, [products])

    useEffect(() => {
        // console.log('effect');
        onGridReady();
    }, [productStatus, onGridReady])

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true
    }), []);


    const cellClickedListener = useCallback(event => {
        productEditHandler({
            'parentCatalog': event.data.parentCatalog,
            'childCatalog': event.data.childCatalog,
            'id': event.data._id,
            'image': `http://localhost:8080/${event.data.imageUrl}`,
            'title': event.data.title,
            'material': event.data.material,
            'size': event.data.size,
            'price': event.data.price,
            'description': event.data.description,
        });
    }, [productEditHandler]);

    return (
        <div className={`${classes.main} ag-theme-alpine`}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                animateRows={true}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                onCellClicked={cellClickedListener}
            >
            </AgGridReact>
        </div>
    )
}

export default React.memo(ProductList_Aggrid);