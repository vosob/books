import { Route, Routes } from "react-router-dom";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { BooksPage } from "./pages/BooksPage";
import { PublicRoute } from "./components/PublicRoute";
import { AuthOnlyRoute } from "./components/AuthOnlyRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Публічні роути - доступні всім */}
        <Route element={<PublicRoute />}>
          <Route index path="/" element={<HomePage />} />
        </Route>

        {/* Роути тільки для НЕавторизованих користувачів */}
        <Route element={<AuthOnlyRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Приватні роути */}
        <Route element={<PrivateRoute />}>
          <Route path="/books" element={<BooksPage />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};
