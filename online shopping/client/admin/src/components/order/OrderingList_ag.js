import React, { useState, useRef, useMemo, useCallback, useEffect, memo } from 'react'
import { AgGridReact } from 'ag-grid-react';
import Button from '../ui/Button';
import classes from './OrderingList_ag.module.css';
import Api from '../../service/api';
function OrderingList_ag(props) {
    const { status, statusChangeHandler } = props;

    const buttonField = {
        field: '', cellRenderer: memo((p) => {
            const onMarkDone = () => {
                Api.admin.updateOrder({ status: 1 }, p.data._id)
                    .then(result => {
                        if (result.status === 200) {
                            statusChangeHandler(false);
                        }
                    })
                    .catch(err => {
                        statusChangeHandler(true);
                    });
            }
            return <Button className={classes.deletebtn} onClick={onMarkDone}>Done</Button>
        }), resizable: null, cellStyle: { 'textAlign': 'center' }
    }

    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [columnDefs] = useState([
        { field: 'email' },
        { field: 'created' },
        { field: 'total' },
        buttonField
    ]);

    const onGridReady = useCallback(() => {
        Api.admin.getOrders(0)
            .then(result => { return result.json() })
            .then(data => {
                const orders = data.orders;
                const newOrders = [];
                for (const o of orders) {
                    const splitDate = o.createdAt.split('T');
                    const date = splitDate[0];
                    const time = splitDate[1].split('.')[0];
                    const formatTime = time + ' ' + date;
                    newOrders.push({
                        email: o.email,
                        created: formatTime,
                        total: o.cart.subTotal,
                        items: o.cart.items,
                        _id: o._id
                    })
                }
                setRowData(newOrders);
                gridRef.current.api.sizeColumnsToFit(
                    {
                        defaultMinWidth: 50,
                        columnLimits: [
                            { key: 'email', minWidth: 200 },
                            { key: '', minWidth: 400 },
                        ],
                    }
                );
            })
            .catch(err => {
                statusChangeHandler(true);
            });
    }, [statusChangeHandler])

    useEffect(() => {
        // console.log(status);
        onGridReady();

    }, [status, onGridReady])

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
    }), []);

    return (
        <div className={`ag-theme-alpine ${classes.main}`}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                animateRows={true}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
            // onCellClicked={cellClickedListener}
            >
            </AgGridReact>
        </div>
    )
}

export default React.memo(OrderingList_ag)