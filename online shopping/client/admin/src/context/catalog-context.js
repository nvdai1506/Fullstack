import React, { useState } from 'react'

const CatalogContext = React.createContext({
    // catalog+child
    status: {},
    editValue: {},
    editChildValue: {},
    editHandler: (value) => { },
    editChildHandler: (value) => { },
    statusHandler: () => { },
});


export const CatalogContextProvider = (props) => {
    // catalog+child
    const [editValue, setEditValue] = useState({});
    const [editChildValue, setEditChildValue] = useState({});
    const [status, setStatus] = useState({});

    const editHandler = (value) => {
        setEditValue(value);
    };
    const editChildHandler = (value) => {
        setEditChildValue(value);
    };
    const statusHandler = (value) => {
        setStatus(value);
    };

    const contextValue = {
        editValue: editValue,
        editChildValue: editChildValue,
        status: status,
        editHandler: editHandler,
        editChildHandler: editChildHandler,
        statusHandler: statusHandler,
    }

    return (
        <CatalogContext.Provider value={contextValue}>
            {props.children}
        </CatalogContext.Provider>
    )
}

export default CatalogContext;