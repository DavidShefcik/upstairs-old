import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { ApolloError, gql } from "@apollo/client";

import FormSettingsSection from "~/layout/pages/settings/FormSettingsSection";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { useSessionContext } from "~/context/Session";
import FormInput, { InputType } from "~/components/inputs/FormInput";
import { ErrorMessages, humanReadableErrorMessages } from "~/constants/errors";

const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UpdateAccountMutation(
    $currentPassword: String
    $newPassword: String
  ) {
    updateAccount(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      needToVerify
      success
    }
  }
`;

interface UpdatePasswordFields {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
interface UpdatePasswordResponse {
  updateAccount: {
    success: boolean;
    user?: Pick<User, "email">;
  };
}

export default function ChangePassword() {
  const { user } = useSessionContext();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const setAllErrors = (message: string) => {
    setCurrentPasswordError(message);
    setNewPasswordError(message);
    setConfirmPasswordError(message);
  };
  const onError = (error: ApolloError) => {
    const { networkError, graphQLErrors } = error;

    if (networkError) {
      setAllErrors(
        humanReadableErrorMessages[ErrorMessages.INTERNAL_SERVER_ERROR]
      );
    } else {
      graphQLErrors.forEach(({ message }) => {
        switch (message) {
          case ErrorMessages.INCORRECT_PASSWORD:
            setCurrentPasswordError(humanReadableErrorMessages[message]);
            break;
          default:
            setAllErrors(
              humanReadableErrorMessages[ErrorMessages.INTERNAL_SERVER_ERROR]
            );
        }
      });
    }
  };
  const onCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setAllErrors("");
  };
  const customValidation = (): boolean => {
    if (newPassword !== confirmPassword) {
      setNewPasswordError(
        humanReadableErrorMessages[ErrorMessages.PASSWORDS_DO_NOT_MATCH]
      );
      setConfirmPasswordError(
        humanReadableErrorMessages[ErrorMessages.PASSWORDS_DO_NOT_MATCH]
      );

      return false;
    } else {
      return true;
    }
  };

  return (
    <FormSettingsSection<UpdatePasswordFields, UpdatePasswordResponse>
      {...{ isSubmitting, setIsSubmitting }}
      title="Change password"
      showButtons
      setErrors={{
        currentPassword: setCurrentPasswordError,
        newPassword: setNewPasswordError,
        confirmPassword: setConfirmPasswordError,
      }}
      data={{
        currentPassword,
        newPassword,
        confirmPassword,
      }}
      fields={{
        currentPassword: {
          fieldName: "Current password",
          isRequired: true,
        },
        newPassword: {
          fieldName: "New password",
          isRequired: true,
        },
        confirmPassword: {
          fieldName: "Confirm password",
          isRequired: true,
        },
      }}
      mutation={UPDATE_ACCOUNT_MUTATION}
      onError={onError}
      onCancel={onCancel}
      customValidation={customValidation}
    >
      <VStack spacing="4">
        {/* Current password */}
        <FormInput
          id="password"
          name="password"
          label="Current Password"
          inputType={InputType.TEXT}
          type="password"
          autoComplete="current-password"
          maxLength={INPUT_SETTINGS.password.maxLength}
          value={currentPassword}
          onChange={(val) => setCurrentPassword(val)}
          disabled={isSubmitting}
          error={currentPasswordError}
        />
        {/* New password */}
        <FormInput
          id="newPassword"
          name="newPassword"
          label="New Password"
          inputType={InputType.TEXT}
          type="password"
          autoComplete="new-password"
          maxLength={INPUT_SETTINGS.password.maxLength}
          value={newPassword}
          onChange={(val) => setNewPassword(val)}
          disabled={isSubmitting}
          error={newPasswordError}
        />
        {/* Confirm password */}
        <FormInput
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Confirm New Password"
          inputType={InputType.TEXT}
          type="password"
          autoComplete="new-password"
          maxLength={INPUT_SETTINGS.password.maxLength}
          value={confirmPassword}
          onChange={(val) => setConfirmPassword(val)}
          disabled={isSubmitting}
          error={confirmPasswordError}
        />
      </VStack>
    </FormSettingsSection>
  );
}
