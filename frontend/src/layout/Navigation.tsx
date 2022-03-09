import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";

import HomePage from "~/pages/index";
import LoginPage from "~/pages/login";
import LoginVerifyPage from "~/pages/login/Verify";
import RegisterPage from "~/pages/Register";
import ForgotPasswordPage from "~/pages/ForgotPassword";
import ResetPasswordPage from "~/pages/ResetPassword";
import NotFound from "~/pages/NotFound";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="login">
            <Route index element={<LoginPage />} />
            <Route path="verify" element={<LoginVerifyPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* TODO: Make logout an authenticated only page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
