import SettingsContent from "~/layout/pages/settings/SettingsContent";
import ChangePassword from "~/layout/pages/settings/security/ChangePassword";
import ManageTwoFactorAuthentication from "~/layout/pages/settings/security/ManageTwoFactorAuthentication";
import SessionManagement from "~/layout/pages/settings/security/SessionManagement";

export default function SecuritySettings() {
  return (
    <SettingsContent title="Security Settings">
      <ChangePassword />
      <ManageTwoFactorAuthentication />
      <SessionManagement />
    </SettingsContent>
  );
}
