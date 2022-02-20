import { useState } from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { Text, Link as ChakraLink } from "@chakra-ui/react";

import BaseAuthentication, {
  BaseAuthenticationTextInput,
} from "~/layout/BaseAuthentication";
import { INPUT_SETTINGS } from "~/constants/inputs";

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordMutation(code: String!, $password: String!) {
    resetPassword(code: $code, password: $password) {
      success
    }
  }
`;

interface ResetPasswordFields {
  password: string;
  confirmPassword: string;
}
interface ResetPasswordResponse {
  success: boolean;
}

export default function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const onSuccess = (data: ResetPasswordResponse) => {
    const { success } = data;

    console.log({ success });
  };

  return (
    <BaseAuthentication<ResetPasswordFields, ResetPasswordResponse>
      {...{ isSubmitting, setIsSubmitting, onSuccess }}
      title="Reset Password"
      data={{
        password,
        confirmPassword,
      }}
      mutation={RESET_PASSWORD_MUTATION}
      setErrors={{
        password: setPasswordError,
        confirmPassword: setConfirmPasswordError,
      }}
      fields={{
        password: {
          fieldName: "Password",
          isRequired: true,
        },
        confirmPassword: {
          fieldName: "Confirm password",
          isRequired: true,
        },
      }}
    >
      <BaseAuthenticationTextInput
        type="password"
        label="Password"
        name="password"
        error={passwordError}
        disabled={isSubmitting}
        maxLength={INPUT_SETTINGS.password.maxLength}
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        isRequired
        autoFocus
      />
      <BaseAuthenticationTextInput
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        error={confirmPasswordError}
        disabled={isSubmitting}
        maxLength={INPUT_SETTINGS.password.maxLength}
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        isRequired
      />
    </BaseAuthentication>
  );
}
