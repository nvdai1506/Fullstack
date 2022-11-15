import { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";


import Login from './pages/Login';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Order from './pages/Order';
import Dashboard from "./pages/Dashboard";

import AuthContext from "./context/auth-context";
import ProtectedRoute from "./components/auth/ProtectedRoute";


import { CatalogContextProvider } from './context/catalog-context';
import { ProductContextProvider } from './context/product-context';

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Layout>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <ProtectedRoute
          path='/'
          render={() =>
            <Dashboard/>
          }
          isAuthentication={isLoggedIn}
          redirect='/login'
          exact
        />
        <ProtectedRoute
          path='/catalog'
          // component={Catalog}
          render={() =>
            <CatalogContextProvider>
              <Catalog />
            </CatalogContextProvider>
          }
          isAuthentication={isLoggedIn}
          redirect='/login'
        />
        <ProtectedRoute
          path='/product'
          // component={Product}
          render={() =>
            <ProductContextProvider>
              <Product />
            </ProductContextProvider>
          }
          isAuthentication={isLoggedIn}
          redirect='/login'
        />
        <ProtectedRoute
          path='/order'
          component={Order}
          isAuthentication={isLoggedIn}
          redirect='/login'
        />

      </Switch>
      {/* <CatalogContextProvider>
        <Switch>
          <ProtectedRoute
            path='/'
            component={Catalog}
            isAuthentication={isLoggedIn}
            redirect='/login'
            exact
          />
          <ProtectedRoute
            path='/product'
            component={Product}
            isAuthentication={isLoggedIn}
            redirect='/login'
          />
        </Switch>
      </CatalogContextProvider> */}

    </Layout>
  );
}

export default App;
