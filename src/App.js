import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import Shop from "./pages/Shop/Shop";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import "antd/dist/antd.min.css";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import SubCreate from "./pages/admin/sub/SubCreate";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

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
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />
        <Route
          path="/user/password"
          element={
            <UserRoute>
              <Password />
            </UserRoute>
          }
        />
        <Route
          path="/user/wishlist"
          element={
            <UserRoute>
              <Wishlist />
            </UserRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <AdminRoute>
              <CategoryCreate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/category/:slug"
          element={
            <AdminRoute>
              <CategoryUpdate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/sub"
          element={
            <AdminRoute>
              <SubCreate />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
