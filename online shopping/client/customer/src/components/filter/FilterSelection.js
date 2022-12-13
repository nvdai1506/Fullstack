import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './FilterSelection.module.css';

function FilterSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  const onClickItemHandler = event => {
    const label = event.target;
    const value = label.getAttribute('for');
    searchParams.set('filter', value);
    searchParams.set('page', 1);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    })
  }
  return (
    <div className={classes.filter_select_container}>
      <h1>Sản Phẩm</h1>
      <details className={classes["custom-select"]}>
        <summary className={classes.radios}>
          <input className={classes.radios_input} type="radio" name="item" id="1" title="Mới nhất" defaultChecked />
          <input className={classes.radios_input} type="radio" name="item" id="2" title="Bán chạy" />
          <input className={classes.radios_input} type="radio" name="item" id="3" title={`Cao đến thấp`} />
          <input className={classes.radios_input} type="radio" name="item" id="4" title="Thấp đến cao" />

        </summary>
        <ul className={classes.list}>
          <li className={classes.list_item} onClick={onClickItemHandler}>
            <label htmlFor="1">
              Mới nhất
            </label>
          </li>
          <li className={classes.list_item} onClick={onClickItemHandler}>

            <label htmlFor="2">Bán chạy</label>
          </li>
          <li className={classes.list_item} onClick={onClickItemHandler}>

            <label htmlFor="3">Giá: cao &rarr; thấp</label>
          </li>
          <li className={classes.list_item} onClick={onClickItemHandler}>

            <label htmlFor="4">Giá: thấp &rarr; cao</label>
          </li>
        </ul>
      </details>
    </div>


  )
}

export default FilterSelection