import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Layout from './components/layout/Layout';
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Home from './pages/Home';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path='/signup' element={<Auth loginMode={false} />} />
        <Route path='/login' element={<Auth loginMode={true} />} />
        <Route element={<ProtectedRoute />} >
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes >
    </Layout >
  );
}

export default App;
