import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ProductListContainer,
  ProductAddContainer,
} from "containers/containers";
import DefaultLayout from "./layouts/default.layout";

function App() {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route exact path="/" element={<ProductListContainer />} />
          <Route exact path="/products/add" element={<ProductAddContainer />} />
          <Route exact path="/cart" element={<ProductListContainer />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
}

export default App;
