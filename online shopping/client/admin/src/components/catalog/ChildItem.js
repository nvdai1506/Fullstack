import React, { useContext } from 'react'
import classes from './ChildItem.module.css';
import Button from '../ui/Button';

import CatalogContext from '../../context/catalog-context';
import Api from '../../service/api';

function ChildItem(props) {
  const catalogCtx = useContext(CatalogContext);
  const onEditHandler =()=>{
    catalogCtx.editChildHandler({parent:props.parent, id: props.id, title: props.title});
  };
  const onDeleteHandler =()=>{
    Api.admin.deleteChildCatalog(props.id)
        .then(result=>{
            catalogCtx.statusHandler({success:"Child is deleted successfully."});
        })
        .catch(err=>{
            catalogCtx.statusHandler({error:"Could not delete Child!"});
        });
  };
  return (
    <div className={classes.main}>
      <div className={classes.title}>
        <h3>{props.title}</h3>
      </div>
      <div>
        <Button className={classes.btn} onClick={onEditHandler}>Edit</Button>
        <Button className={classes.btn} onClick={onDeleteHandler}>Delete</Button>
      </div>
    </div>
  )
}

export default ChildItem