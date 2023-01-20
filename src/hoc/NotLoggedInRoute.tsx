import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  token: string;
};

const NotLoggedInRoute = ({ token }: Props) => {
  if (token) return <Navigate to="/profile" />;
  return <Outlet />;
};

export default NotLoggedInRoute;
