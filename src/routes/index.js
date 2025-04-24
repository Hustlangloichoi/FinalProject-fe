import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import useAuth from "../hooks/useAuth";

function Router() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<DetailPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        path="/admin"
        element={
          <AuthRequire>
            {user && user.role === "admin" ? <AdminPage /> : <NotFoundPage />}
          </AuthRequire>
        }
      />
      <Route
        path="/user"
        element={
          <AuthRequire>
            {user && user.role === "user" ? <UserPage /> : <NotFoundPage />}
          </AuthRequire>
        }
      />
    </Routes>
  );
}

export default Router;
