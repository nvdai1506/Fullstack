import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Layout from './components/layout/Layout';
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Home from './pages/Home';
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="product/:productId" element={<ProductDetails />}/>
        </Route>
        <Route path='/signup' element={<Auth loginMode={false} />} />
        <Route path='/login' element={<Auth loginMode={true} />} />
        <Route path='/cart' element={<Cart />} />
        <Route element={<ProtectedRoute />} >
          <Route path='/profile' element={<Profile />} />
          <Route path='/order' element={<Order />} />
        </Route>
        <Route path='/*' element={<NotFound />}/>
      </Routes >
    </Layout >
  );
}

export default App;
