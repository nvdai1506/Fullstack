import { useContext } from "react";
import { Route, Routes,Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";


import Login from './pages/Login';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Order from './pages/Order';
import Dashboard from "./pages/Dashboard";
import DashboardScreen from "./pages/DashboardScreen";

import AuthContext from "./context/auth-context";
import ProtectedRoute from "./components/auth/ProtectedRoute";


import { CatalogContextProvider } from './context/catalog-context';
import { ProductContextProvider } from './context/product-context';
import AddAccount from "./components/dashboard/AddAccount";

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Layout>
      <Routes>
        {/* <Route path='/' element={<Navigate to='/login'/>} /> */}
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute isAuthentication={isLoggedIn} redirect='/login'/>}>
          <Route path="/">
            <Route index element={<Dashboard/>}></Route>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="account" element={<AddAccount/>}/>
          </Route>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/order' element={<Order/>}/>
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
