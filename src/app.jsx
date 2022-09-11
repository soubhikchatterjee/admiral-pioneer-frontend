import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ProductListContainer,
  ProductAddContainer,
  CartContainer
} from "containers/containers";
import DefaultLayout from "./layouts/default.layout";

function App() {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route exact path="/products/add" element={<ProductAddContainer />} />
          <Route exact path="/" element={<ProductListContainer />} />
          <Route exact path="/cart" element={<CartContainer />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
}

export default App;
