import React, { useState, useContext } from 'react'

import classes from './Menu.module.css';
import Button from '../ui/Button';
import AddAccount from './AddAccount';
import AuthContext from '../../context/auth-context';

function Menu() {
    const authCtx = useContext(AuthContext);
    const { role } = authCtx;
    const [openAddAccountModal, setOpenAddAccountModal] = useState(false);
    const onClickAddHandler = () => {
        setOpenAddAccountModal(true);
    }
    const onCloseAddAccountModalHandler = () => {
        setOpenAddAccountModal(false);
    }
    return (
        <div className={classes.main}>
            {Number(role) === 1 && <Button onClick={onClickAddHandler}>Add Manager Account</Button>}
            {openAddAccountModal && <AddAccount onClose={onCloseAddAccountModalHandler} />}
        </div>
    );
}

export default Menu