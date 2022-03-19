import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";

import SettingsSection from "~/layout/pages/settings/SettingsSection";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { isValidString } from "~/utils/strings";
import { useSessionContext } from "~/context/Session";
import FormInput, { INPUT_TYPE } from "~/components/inputs/FormInput";

const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UpdateAccountMutation($email: String) {
    updateAccount(email: $email) {
      success
      user {
        email
      }
    }
  }
`;

export default function UpdateEmail() {
  const { user } = useSessionContext();

  const [email, setEmail] = useState(user!.email);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");

  const [
    requestEmailUpdate,
    { loading: updateEmailLoading, error: updateEmailError },
  ] = useMutation(UPDATE_ACCOUNT_MUTATION, {
    variables: {
      email,
    },
  });

  const handleEmailUpdate = async () => {
    setEmailError("");
    setConfirmEmailError("");

    let hasError = false;

    if (!isValidString(email)) {
      setEmailError("Email is required!");

      hasError = true;
    }
    if (!isValidString(confirmEmail)) {
      setConfirmEmailError("Confirm email is required!");

      hasError = true;
    }

    if (hasError) {
      return;
    }

    await requestEmailUpdate();
  };
  const handleCancel = () => {
    setEmail(user!.email);
    setConfirmEmail("");

    setEmailError("");
    setConfirmEmailError("");
  };

  useEffect(() => {
    if (updateEmailError) {
      setEmailError(updateEmailError.message);
      setConfirmEmailError(updateEmailError.message);
    }
  }, [updateEmailError]);

  return (
    <SettingsSection
      title="Update account email"
      showButtons
      submitLoading={updateEmailLoading}
      onSubmit={handleEmailUpdate}
      onCancel={handleCancel}
    >
      <VStack spacing="4">
        {/* Email */}
        <FormInput
          id="email"
          label="Email Address"
          inputType={INPUT_TYPE.TEXT}
          type="email"
          maxLength={INPUT_SETTINGS.email.maxLength}
          value={email}
          onChange={(val) => setEmail(val)}
          disabled={updateEmailLoading}
          error={emailError}
        />
        {/* Confirm email */}
        <FormInput
          id="confirmEmail"
          label="Confirm Email Address"
          inputType={INPUT_TYPE.TEXT}
          type="email"
          maxLength={INPUT_SETTINGS.email.maxLength}
          value={confirmEmail}
          onChange={(val) => setConfirmEmail(val)}
          disabled={updateEmailLoading}
          error={confirmEmailError}
        />
      </VStack>
    </SettingsSection>
  );
}
