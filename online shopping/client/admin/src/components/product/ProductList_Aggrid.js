import React, { useState, useRef, useMemo, useCallback, useContext, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react';

import classes from './ProductList_Aggrid.module.css';
import ProductContext from '../../context/product-context';

import DeleteBtn from './DeleteBtn.js';

function ProductList_Aggrid(props) {
    const products = props.products;
    const productCtx = useContext(ProductContext);



    const gridRef = useRef();
    // const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    // const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        // { field: '_id' },
        { field: 'title' },
        // { field: 'imageUrl' },
        { field: 'material' },
        { field: 'size' },
        { field: 'price' },
        { field: 'description', width:500 },
        { field: '', cellRenderer: DeleteBtn, resizable: null, cellStyle:{'textAlign': 'center'} }
    ]);


    useEffect(() => {
        // gridRef.current.api.sizeColumnsToFit();
        setRowData(products);
    }, [products])

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true
    }));

    const cellClickedListener = useCallback(event => {
        productCtx.productEditHandler({
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
    }, []);

    return (
        <div className={`${classes.main} ag-theme-alpine`}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                animateRows={true}
                defaultColDef={defaultColDef} // Default Column Properties
                onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                ref={gridRef}
            >
            </AgGridReact>
        </div>
    )
}

export default React.memo(ProductList_Aggrid);