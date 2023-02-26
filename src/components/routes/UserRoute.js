import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  if (user && user.token) {
    return children;
  }
  return <LoadingToRedirect />;
};

export default UserRoute;
