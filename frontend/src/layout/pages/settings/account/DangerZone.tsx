import { useEffect, useState } from "react";
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
interface DeleteAccountResponse {
  updateAccount: {
    needToVerify: boolean;
    success: boolean;
  };
}

export default function UpdateEmail() {
  const { user } = useSessionContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [
    requestAccountDeletion,
    { loading: deleteAccountLoading, error: deleteAccountError },
  ] = useMutation(DELETE_ACCOUNT_MUTATION);

  useEffect(() => {
    setIsSubmitting(deleteAccountLoading);
  }, [deleteAccountLoading]);

  return (
    <SettingsSection<{}, DeleteAccountResponse>
      {...{ isSubmitting, setIsSubmitting }}
      title="Danger Zone"
      titleColor="red.500"
      data={{}}
      fields={{}}
      setErrors={{}}
      onError={() => {}}
      onCancel={() => {}}
      mutation={DELETE_ACCOUNT_MUTATION}
    >
      <Button type="submit" isLoading={deleteAccountLoading} colorScheme="red">
        Delete Account
      </Button>
    </SettingsSection>
  );
}
