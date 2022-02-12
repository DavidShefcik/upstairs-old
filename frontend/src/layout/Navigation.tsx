import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import HomePage from "~/pages/index";
import LoginPage from "~/pages/Login";
import RegisterPage from "~/pages/Register";
import NotFound from "~/pages/NotFound";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
