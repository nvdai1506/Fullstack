import React from 'react'

import classes from './AddAccount.module.css';
import Modal from '../ui/Modal';

function AddAccount(props) {
    console.log('account');
  return (
    <Modal onClose={props.onClose}>AddAccount</Modal>
  )
}

export default AddAccount