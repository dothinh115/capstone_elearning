import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
  token: string;
};

const LoggedInRoute = ({ token }: Props) => {
  const { pathname, search } = useLocation();
  if (!token) return <Navigate to={`/login?next=${pathname + search}`} />;
  return <Outlet />;
};

export default LoggedInRoute;
