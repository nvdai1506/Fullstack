import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import Api from '../service/api';
import ListProduct from '../components/product/ListProduct';

function Shop({ endpoint }) {
  console.log(endpoint);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Api.shop.getProductByType(endpoint)
      .then(result => { return result.json() })
      .then(data => {
        setProducts(data.product);
      })
      .catch(err => {
        navigate('/error');
      })
  }, [endpoint]);
  return (
    <ListProduct listProduct={products} />
  )
}

export default React.memo(Shop)