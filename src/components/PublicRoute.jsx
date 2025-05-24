import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const token = localStorage.getItem("token");

  // return token ? <Navigate to="/" replace /> : <Outlet />;
  return token ? <Navigate to="/books" replace /> : <Outlet />;
};
