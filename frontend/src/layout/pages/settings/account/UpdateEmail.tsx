import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { ApolloError, gql } from "@apollo/client";

import FormSettingsSection from "~/layout/pages/settings/FormSettingsSection";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { useSessionContext } from "~/context/Session";
import FormInput, { INPUT_TYPE } from "~/components/inputs/FormInput";
import { ErrorMessages, humanReadableErrorMessages } from "~/constants/errors";

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

interface UpdateEmailFields {
  email: string;
  confirmEmail: string;
}
interface UpdateEmailResponse {
  updateAccount: {
    success: boolean;
    user?: Pick<User, "email">;
  };
}

export default function UpdateEmail() {
  const { user } = useSessionContext();

  const [email, setEmail] = useState(user!.email);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const setAllErrors = (message: string) => {
    setEmailError(message);
    setConfirmEmailError(message);
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
          case ErrorMessages.INVALID_EMAIL:
          case ErrorMessages.EMAIL_ALREADY_IN_USE:
            setEmailError(humanReadableErrorMessages[message]);
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
    setEmail(user!.email);
    setConfirmEmail("");
    setAllErrors("");
  };

  return (
    <FormSettingsSection<UpdateEmailFields, UpdateEmailResponse>
      {...{ isSubmitting, setIsSubmitting }}
      title="Update account email"
      showButtons
      setErrors={{
        email: setEmailError,
        confirmEmail: setConfirmEmailError,
      }}
      data={{
        email,
        confirmEmail,
      }}
      fields={{
        email: {
          fieldName: "Email",
          isRequired: true,
        },
        confirmEmail: {
          fieldName: "Confirm email",
          isRequired: true,
        },
      }}
      mutation={UPDATE_ACCOUNT_MUTATION}
      onError={onError}
      onCancel={onCancel}
    >
      <VStack spacing="4">
        {/* Email */}
        <FormInput
          id="email"
          name="email"
          label="Email Address"
          inputType={INPUT_TYPE.TEXT}
          type="email"
          maxLength={INPUT_SETTINGS.email.maxLength}
          value={email}
          onChange={(val) => setEmail(val)}
          disabled={isSubmitting}
          error={emailError}
        />
        {/* Confirm email */}
        <FormInput
          id="confirmEmail"
          name="confirmEmail"
          label="Confirm Email Address"
          inputType={INPUT_TYPE.TEXT}
          type="email"
          maxLength={INPUT_SETTINGS.email.maxLength}
          value={confirmEmail}
          onChange={(val) => setConfirmEmail(val)}
          disabled={isSubmitting}
          error={confirmEmailError}
        />
      </VStack>
    </FormSettingsSection>
  );
}
