import { useState } from "react";
import { gql } from "@apollo/client";

import BaseAuthentication from "~/layout/BaseAuthentication";
import { INPUT_SETTINGS } from "~/constants/inputs";
import Form from "~/components/inputs/Form";
import FormInput, { INPUT_TYPE } from "~/components/inputs/FormInput";

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordMutation($code: String!, $password: String!) {
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
    <BaseAuthentication title="Reset Password">
      <Form<ResetPasswordFields, ResetPasswordResponse>
        {...{ isSubmitting, onSuccess }}
        submitButtonText="Reset Password"
        showSubmitButton
        data={{
          password,
          confirmPassword,
        }}
        mutation={RESET_PASSWORD_MUTATION}
        setErrors={{
          password: (error) => setPasswordError(error),
          confirmPassword: (error) => setConfirmPasswordError(error),
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
        onError={(error) => console.log("error")}
        setIsSubmitting={(val) => setIsSubmitting(val)}
      >
        <FormInput
          inputType={INPUT_TYPE.TEXT}
          type="password"
          label="Password"
          id="password"
          name="password"
          error={passwordError}
          disabled={isSubmitting}
          maxLength={INPUT_SETTINGS.password.maxLength}
          autoComplete="new-password"
          value={password}
          onChange={(val) => setPassword(val)}
          isRequired
          autoFocus
        />
        <FormInput
          inputType={INPUT_TYPE.TEXT}
          type="password"
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          error={confirmPasswordError}
          disabled={isSubmitting}
          maxLength={INPUT_SETTINGS.password.maxLength}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(val) => setConfirmPassword(val)}
          isRequired
        />
      </Form>
    </BaseAuthentication>
  );
}
