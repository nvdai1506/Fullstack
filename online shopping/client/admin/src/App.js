import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";


import Login from './pages/Login';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Order from './pages/Order';
import Dashboard from "./pages/Dashboard";

import AuthContext from "./context/auth-context";
import ProtectedRoute from "./components/auth/ProtectedRoute";


import { CatalogContextLayout } from './context/catalog-context';
import { ProductContextLayout } from './context/product-context';
import Test from "./pages/Test";

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Layout>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute isAuthentication={isLoggedIn} redirect='/login' />}>
          <Route path="/test" element={<Test />} />
          <Route path="/">
            <Route index element={<Dashboard />}></Route>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Dashboard />} />
            <Route path="details" element={<Dashboard />} />
            <Route path="history" element={<Dashboard />} />
          </Route>
          <Route element={<CatalogContextLayout />}>
            <Route path='/catalog' element={<Catalog />} />
          </Route>
          <Route element={<ProductContextLayout />}>
            <Route path='/product' element={<Product />} />
          </Route>
          <Route path='/order' element={<Order />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
