import { Navigate, Outlet } from "react-router-dom";

export const AuthOnlyRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/books" replace /> : <Outlet />;
};
