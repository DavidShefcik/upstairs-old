import SettingsContent from "~/layout/pages/settings/SettingsContent";
import UpdateEmail from "~/layout/pages/settings/account/UpdateEmail";
import UpdateAddress from "~/layout/pages/settings/account/UpdateAddress";
import DangerZone from "~/layout/pages/settings/account/DangerZone";

export default function AccountSettings() {
  return (
    <SettingsContent title="Account Settings">
      <UpdateEmail />
      <UpdateAddress />
      <DangerZone />
    </SettingsContent>
  );
}
