import { Text } from "@chakra-ui/react";

import SettingsContent from "~/layout/pages/settings/SettingsContent";
import SettingsSection from "~/layout/pages/settings/SettingsSection";

export default function SecuritySettings() {
  return (
    <SettingsContent title="Security Settings">
      <SettingsSection title="Update account security">
        {/* Change password */}
        {/* Enable/Disable 2fa */}
        {/* 
          TODO: Logout all other sessions. We'll need to implement
          refresh tokens on the backend. The access tokens
          need to have a short life (15 minutes)
         */}
        <Text>TODO</Text>
      </SettingsSection>
    </SettingsContent>
  );
}
