import React, { useState, useMemo, useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react';

import classes from './AddAccount.module.css';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import StatusMess from '../ui/StatusMess';
import useInput from '../../hooks/use-input';
import Api from '../../service/api';

function AddAccount(props) {

    const [status, setStatus] = useState({});

    const {
        value: enteredEmail,
        setValue: setEnteredEmail,
        isValid: enteredEmailIsValid,
        valueChangeHandler: emailChangedHandler,
        reset: resetEmailInput
    } = useInput(value => value.trim().includes('@'));
    const {
        value: enteredPassword,
        setValue: setEnteredPassword,
        isValid: enteredPasswordIsValid,
        valueChangeHandler: passwordChangedHandler,
        reset: resetPasswordInput
    } = useInput(value => value.trim().length >= 6);

    const onClickHandler = () => {
        setStatus({});
    }
    const onAddHandler = () => {
        Api.admin.addManagementAccount({email: enteredEmail, password:enteredPassword, role:2})
        .then(result =>{
            if(result.status === 201){
                setStatus({success:'User is created successfully.'});
            }
        })
        .catch(err=>{
            setStatus({error:'Can not create user!'});
        });
    }

    // ag grid
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'email' },
        { field: 'password' },
        {
            field: '', cellRenderer: (p) => {
                const onDeleteHandler = () => {
                    Api.admin.deleteManagementAccount(p.data._id)
                    .then(result =>{
                        if(result.status === 200){
                            setStatus({success:'User is deleted.'});
                        }
                    })
                    .catch(err=>{
                        setStatus({error:'Can not delete this user!'});
                    });
                }
                return <Button className={classes.deletebtn} onClick={onDeleteHandler}>Delete</Button>
            }, cellStyle: { 'textAlign': 'center' }
        }
    ]);



    const onGridReady = useCallback(() => {
        Api.admin.getManagementAccount()
            .then(result => {
                return result.json();
            })
            .then(data => {
                setRowData(data.users);
                gridRef.current.api.sizeColumnsToFit(
                    {
                        defaultMinWidth: 100,
                        columnLimits: [
                            { key: 'email', minWidth: 300 },
                            { key: 'password', minWidth: 400 }],
                    }
                );
            })
            .catch(err => {
                setStatus({ error: 'Could not load accounts!' });
            });
    }, [status])

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
    }), []);

    return (
        <Modal onClose={props.onClose} className={classes.main}>
            <div className={classes.status}>
                {status.error && <StatusMess state='error'>{status.error}</StatusMess>}
                {status.success && <StatusMess state='success'>{status.success}</StatusMess>}
            </div>
            <div className={classes.form}>
                <Input title='Email'
                    className={classes.input}
                    onClick={onClickHandler}
                    value={enteredEmail}
                    onChange={emailChangedHandler} />
                <Input title='Password'
                    // type='password'
                    className={classes.input}
                    onClick={onClickHandler}
                    value={enteredPassword}
                    onChange={passwordChangedHandler} />
                <Button className={classes.btn} onClick={onAddHandler}>Add</Button>
            </div>
            <div className={classes.list}>
                <div className={`${classes.ag_grid} ag-theme-alpine`}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                    >
                    </AgGridReact>
                </div>
            </div>
            <Button className={classes.closebtn} onClick={props.onClose}>Close</Button>
        </Modal>
    )
}

export default AddAccount