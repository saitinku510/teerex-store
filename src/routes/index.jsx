import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "pages/Home/index";
import Header from "components/Header";
import Cart from "pages/Cart/index";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shopping-cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
