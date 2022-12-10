import React from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import Shop from "./pages/Shop/Shop";
import RegisterComplete from "./pages/auth/RegisterComplete";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
      </Routes>
    </>
  );
};

export default App;
