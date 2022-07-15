import "./App.css";
import React from "react";
import Products from "./pages/products/Products";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:id" element={<SingleProduct />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
