import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  token: string;
};

const LoggedInRoute = ({ token }: Props) => {
  if (!token) return <Navigate to="/" />;
  return <Outlet />;
};

export default LoggedInRoute;
