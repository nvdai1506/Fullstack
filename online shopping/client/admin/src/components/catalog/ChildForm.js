import React, { useContext, useEffect, useState } from 'react'
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

import Api from '../../service/api';
import CatalogContext from '../../context/catalog-context';
import useInput from'../../hooks/use-input';

import classes from './ChildForm.module.css';

function ChildForm(props) {
    const catalogCtx = useContext(CatalogContext);
    const { editChildValue } = catalogCtx;

    const { 
        value:enteredTitle, 
        valueChangeHandler: titleInputChangeHandler,
        setValue: setEnteredTitle,
        hasError: titleInputHasError
    } = useInput(value => value.trim() !== '');

    const [selectValue, setSelectValue] = useState('');

    const updateMode = Object.keys(editChildValue).length !== 0;

    const onClickHandler = event => {
        catalogCtx.statusHandler({});
    }
    const onCancelHandler = () => {
        catalogCtx.editChildHandler({});
        setEnteredTitle('');
    };



    useEffect(() => {
        console.log('updateMode');
        if (updateMode) {
            setEnteredTitle(editChildValue.title);
            setSelectValue(editChildValue.parent);
        }
    }, [updateMode, editChildValue, setEnteredTitle])

    const onChangeSelectHandler = event => {
        setSelectValue(event.target.value);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        
        if(selectValue ===''){
            return catalogCtx.statusHandler({ error: "Select Catalog, please!" });
        }
        if(titleInputHasError){
            return catalogCtx.statusHandler({ error: "Name must not be empty!" });
        }
        
        if (!updateMode) {
            Api.admin.addChildCatalog({ parent: selectValue, title: enteredTitle })
                .then(result => {
                    if (result.status === 201) {
                        catalogCtx.statusHandler({ success: "You have successfully added Child." });
                        setSelectValue(0);
                    }
                })
                .catch(err => {
                    return err.json().then(err => {
                        catalogCtx.statusHandler({ error: err.message });
                    });

                });
        } else {
            Api.admin.updateChildCatalog({ parent: selectValue, title: enteredTitle }, editChildValue.id)
                .then(result => {
                    catalogCtx.statusHandler({ success: "You have successfully updated Child." });
                    catalogCtx.editChildHandler({});
                    setSelectValue(0);
                })
                .catch(err => {
                    catalogCtx.statusHandler({ error: "Could not update Child!" });
                });
        }
        setEnteredTitle('');
    }
    return (
        <div className={classes.main}>
            <label className={classes.title}>Child Catalog</label>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.select}>
                    <Select title='Select Catalog' onChange={onChangeSelectHandler} values={props.catalogs} value={selectValue} />
                </div>
                <Input title='Title'
                    className={classes.input}
                    onClick={onClickHandler}
                    value={enteredTitle}
                    onChange={titleInputChangeHandler} 
                    />
                {!updateMode &&
                    <Button className={classes.btn} type='submit'>Add</Button>
                }
                {updateMode &&
                    <Button className={classes.btn} state='cancle' onClick={onCancelHandler}>Cancel</Button>
                }
                {updateMode &&
                    <Button className={classes.btn} type='submit'>Update</Button>
                }
            </form>
        </div>
    )
}

export default React.memo(ChildForm);