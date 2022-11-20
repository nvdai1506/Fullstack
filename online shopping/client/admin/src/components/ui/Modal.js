import React from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = props => {
    return <div className={`${classes.backdrop}`} onClick={props.onClose}></div>
}
const ModalOverlay = props => {
    return (
        <div className={`${classes.modal} ${props.className}`}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}
const portalElement= document.getElementById('overlays')
const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,portalElement)}
            {ReactDOM.createPortal(<ModalOverlay className={props.className}> {props.children}</ModalOverlay>, portalElement)}
        </>
    );
};

export default Modal;