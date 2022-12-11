import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Layout from './components/layout/Layout';
import Auth from "./pages/Auth";
import User from "./pages/user/User";
import Home from './pages/Home';
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import ProductDetails from "./components/product/ProductDetails";
import Shop from './pages/Shop';


import CartContext from "./context/cart-context";
import { useIndexedDB } from 'react-indexed-db';
import Error from "./pages/Error";



function App() {
  const cartCtx = useContext(CartContext);
  const { getAll } = useIndexedDB('cart');
  useEffect(() => {
    getAll().then(cartFromDB => {
      // console.log(cartFromDB);
      if (cartFromDB.length !== 0) {
        cartCtx.initCart(cartFromDB[0]);
      }
    });
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="product/:productId" element={<ProductDetails />} />
        </Route>
        <Route path="/shop">
          <Route index element={<Shop endpoint='ao?level=1' />} />
          <Route path='ao' element={<Shop endpoint='ao?level=1' title={'Áo'} />} />
          <Route path='ao-thun' element={<Shop endpoint='ao-thun?level=2' title={'Áo Thun'} />} />
          <Route path='ao-khoac' element={<Shop endpoint='ao-khoac?level=2' title={'Áo Khoác'} />} />
          <Route path='ao-so-mi' element={<Shop endpoint='ao-so-mi?level=2' title={'Áo Sơ Mi'} />} />
          <Route path='ao-ba-lo' element={<Shop endpoint='ao-ba-lo?level=2' title={'Áo Ba Lỗ'} />} />
          <Route path='quan' element={<Shop endpoint='quan?level=1' title={'Quần'} />} />
          <Route path='quan-jogger' element={<Shop endpoint='quan-jogger?level=2' title={'Quần Jogger'} />} />
          <Route path='quan-tay' element={<Shop endpoint='quan-tay?level=2' title={'Quần Tây'} />} />
          <Route path='quan-jean' element={<Shop endpoint='quan-jean?level=2' title={'Quần Jean'} />} />
          <Route path='quan-short' element={<Shop endpoint='quan-short?level=2' title={'Quần short'} />} />
        </Route>
        <Route path='/signup' element={<Auth loginMode={false} />} />
        <Route path='/login' element={<Auth loginMode={true} />} />
        <Route path='/cart' element={<Cart />} />
        <Route element={<ProtectedRoute />} >
          <Route path='/user'>
            <Route index element={<User />} />
            <Route path='profile' element={<User />} />
            <Route path='password' element={<User />} />
            <Route path='order-history' element={<User />} />

          </Route>
        </Route>
        <Route path='/error' element={<Error />} />
        <Route path='/*' element={<NotFound />} />
      </Routes >
    </Layout >
  );
}

export default App;
