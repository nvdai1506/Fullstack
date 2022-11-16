import React, { useContext, useEffect } from 'react'
import classes from './CatalogForm.module.css';

import Button from '../ui/Button';
import Input from '../ui/Input';

import Api from '../../service/api';
import CatalogContext from '../../context/catalog-context';
import useInput from '../../hooks/use-input';

function CatalogForm(props) {
    const catalogCtx = useContext(CatalogContext);
    const { editValue } = catalogCtx;
    const { 
        value:enteredName, 
        valueChangeHandler: nameInputChangeHandler,
        setValue: setEnteredName,
        hasError: nameInputHasError,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');

    const updateMode = Object.keys(catalogCtx.editValue).length !== 0;

    const onClickHandler = event => {
        catalogCtx.statusHandler({});
    }
    const onCancelHandler = () => {
        catalogCtx.editHandler({});
        resetNameInput();
    };
    
    useEffect(() => {
        if (updateMode) {
            setEnteredName(editValue.name);
        }
    }, [updateMode, editValue, setEnteredName])

    const submitHandler = (event) => {
        event.preventDefault();
        if(nameInputHasError){
            console.log('err');
            return catalogCtx.statusHandler({ error: "Name must not be empty!" });
        }
        if (!updateMode) {
            Api.admin.addCatalog({ name: enteredName })
                .then(result => {
                    if (result.status === 201) {
                        catalogCtx.statusHandler({ success: "You have successfully added catalog." });
                    }
                })
                .catch(err => {
                    catalogCtx.statusHandler({ error: "Could not add Catalog!" });
                });
        } else {
            Api.admin.updateCatalog({ name: enteredName }, editValue.id)
                .then(result => {
                    catalogCtx.statusHandler({ success: "You have successfully updated catalog." });
                    catalogCtx.editHandler({});
                })
                .catch(err => {
                    catalogCtx.statusHandler({ error: "Could not update catalog!" });
                });
        }
        setEnteredName('');
    }
    return (
        <div className={classes.main}>
            <label className={classes.title}>Catalog</label>
            <form className={classes.form} onSubmit={submitHandler}>
                <Input title='Name'
                    onClick={onClickHandler}
                    value={enteredName}
                    onChange={nameInputChangeHandler} />
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

export default React.memo(CatalogForm);