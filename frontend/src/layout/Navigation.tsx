import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import SettingsLayout from "~/layout/pages/settings";

// Home
import HomePage from "~/pages/index";
// Authentication
import LoginPage from "~/pages/login";
import LoginVerifyPage from "~/pages/login/Verify";
import RegisterPage from "~/pages/Register";
import ForgotPasswordPage from "~/pages/ForgotPassword";
import ResetPasswordPage from "~/pages/ResetPassword";
// Settings
import SettingsIndexPage from "~/pages/settings";
import SettingsAccountPage from "~/pages/settings/Account";
import SettingsProfilePage from "~/pages/settings/Profile";
import SettingsSecurityPage from "~/pages/settings/Security";
// Error
import NotFound from "~/pages/NotFound";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          {/* Authentication */}
          <Route path="login">
            <Route index element={<LoginPage />} />
            <Route path="verify" element={<LoginVerifyPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* Settings */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<SettingsIndexPage />} />
            <Route path="/settings/account" element={<SettingsAccountPage />} />
            <Route path="/settings/profile" element={<SettingsProfilePage />} />
            <Route
              path="/settings/security"
              element={<SettingsSecurityPage />}
            />
          </Route>
          {/* Error */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
