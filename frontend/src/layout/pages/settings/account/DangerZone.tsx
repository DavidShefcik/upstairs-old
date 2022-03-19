import { gql, useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";

import SettingsSection from "~/layout/pages/settings/SettingsSection";
import { useSessionContext } from "~/context/Session";

const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccountMutation {
    deleteAccount {
      needToVerify
      success
    }
  }
`;

export default function UpdateEmail() {
  const { user } = useSessionContext();

  const [
    requestAccountDeletion,
    { loading: deleteAccountLoading, error: deleteAccountError },
  ] = useMutation(DELETE_ACCOUNT_MUTATION);

  return (
    <SettingsSection title="Danger Zone" titleColor="red.500">
      <Button isLoading={deleteAccountLoading} colorScheme="red">
        Delete Account
      </Button>
    </SettingsSection>
  );
}
