import React, { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import classes from './Search.module.css';
function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [classValue, setClassValue] = useState(classes.search_container)


  const onSearchHanlder = event => {
    setIsOpen(true);
  };
  const onCloseSearch = event => {
    setIsOpen(false);
  };
  useEffect(() => {
    const classValue1 = isOpen ? `${classes.search_container} ${classes.search_container_enable}` : `${classes.search_container}`;
    // console.log(classValue1);
    setClassValue(classValue1);
  }, [isOpen]);

  return (
    <>
      <div className={`action_item`} onClick={onSearchHanlder} >
        <HiOutlineSearch className='icon' />
      </div>
      <div className={`box-center ${classValue}`}>
        <form>
          <input placeholder='Nhập Sản Phẩm Cần Tìm...' />
        </form>
        <AiOutlineClose className={classes.close_icon} onClick={onCloseSearch} />
      </div>
    </>
  )
}

export default Search