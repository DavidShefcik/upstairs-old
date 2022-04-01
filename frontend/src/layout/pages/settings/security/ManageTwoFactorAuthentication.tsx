import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { ApolloError, gql } from "@apollo/client";

import FormSettingsSection from "~/layout/pages/settings/FormSettingsSection";
import { useSessionContext } from "~/context/Session";
import FormInput, { INPUT_TYPE } from "~/components/inputs/FormInput";
import { ErrorMessages, humanReadableErrorMessages } from "~/constants/errors";

const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UpdateAccountMutation($twoFactorEnabled: Boolean) {
    updateAccount(twoFactorEnabled: $twoFactorEnabled) {
      success
    }
  }
`;

interface UpdateTwoFactorFields {
  twoFactorEnabled: boolean;
}
interface UpdateTwoFactorResponse {
  updateAccount: {
    success: boolean;
  };
}

export default function ManageTwoFactorAuthentication() {
  const { user } = useSessionContext();

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorEnabledError, setTwoFactorEnabledError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onError = (error: ApolloError) => {
    const { networkError, graphQLErrors } = error;

    if (networkError) {
      setTwoFactorEnabledError(
        humanReadableErrorMessages[ErrorMessages.INTERNAL_SERVER_ERROR]
      );
    } else {
      graphQLErrors.forEach(({ message }) => {
        switch (message) {
          default:
            setTwoFactorEnabledError(
              humanReadableErrorMessages[ErrorMessages.INTERNAL_SERVER_ERROR]
            );
        }
      });
    }
  };
  const onCancel = () => {
    setTwoFactorEnabled(false);
    setTwoFactorEnabledError("");
  };

  return (
    <FormSettingsSection<UpdateTwoFactorFields, UpdateTwoFactorResponse>
      {...{ isSubmitting, setIsSubmitting }}
      title="Manage Two Factor Authentication"
      showButtons
      setErrors={{
        twoFactorEnabled: setTwoFactorEnabledError,
      }}
      data={{
        twoFactorEnabled,
      }}
      fields={{
        twoFactorEnabled: {
          fieldName: "Two factor authentication enabled",
          isRequired: true,
        },
      }}
      mutation={UPDATE_ACCOUNT_MUTATION}
      onError={onError}
      onCancel={onCancel}
    >
      <VStack spacing="4">
        {/* Two factor enabled */}
        <FormInput
          id="twoFactorEnabled"
          name="twoFactorEnabled"
          label="Two Factor Authentication Enabled"
          inputType={INPUT_TYPE.TOGGLE}
          value={twoFactorEnabled}
          onChange={(val) => setTwoFactorEnabled(val)}
          disabled={isSubmitting}
          error={twoFactorEnabledError}
          size="lg"
        />
      </VStack>
    </FormSettingsSection>
  );
}
