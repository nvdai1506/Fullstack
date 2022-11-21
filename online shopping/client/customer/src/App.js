import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from './components/layout/Layout';
import Auth from "./pages/Auth";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<Auth />} />
      </Routes>
    </Layout>
  );
}

export default App;
