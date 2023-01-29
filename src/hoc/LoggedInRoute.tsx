import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
  token: string;
};

const LoggedInRoute = ({ token }: Props) => {
  const { pathname } = useLocation();
  if (!token) return <Navigate to={`/login?next=${pathname}`} />;
  return <Outlet />;
};

export default LoggedInRoute;
