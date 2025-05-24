import { Route, Routes } from "react-router-dom";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { BookShelf } from "./components/BookShelf";
import { PublicRoute } from "./components/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/books" element={<BookShelf />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};
