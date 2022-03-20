import { useState } from "react";
import { gql } from "@apollo/client";

import { INPUT_SETTINGS } from "~/constants/inputs";
import { forgotPasswordFormLinks } from "~/constants/links";
import Form from "~/components/inputs/Form";
import FormInput, { INPUT_TYPE } from "~/components/inputs/FormInput";
import BaseAuthentication from "~/layout/BaseAuthentication";

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation RequestPasswordResetMutation($email: String!) {
    requestPasswordReset(email: $email) {
      email
    }
  }
`;

interface ForgotPasswordFields {
  email: string;
}
interface ForgotPasswordResponse {
  email: string;
}

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const onSuccess = (data: ForgotPasswordResponse) => {
    const { email } = data;

    console.log({ email });
  };

  return (
    <BaseAuthentication
      title="Forgot Password?"
      links={forgotPasswordFormLinks}
    >
      <Form<ForgotPasswordFields, ForgotPasswordResponse>
        {...{ isSubmitting, setIsSubmitting, onSuccess }}
        submitButtonText="Request Password Reset"
        showSubmitButton
        data={{
          email,
        }}
        mutation={REQUEST_PASSWORD_RESET_MUTATION}
        setErrors={{
          email: setEmailError,
        }}
        fields={{
          email: {
            fieldName: "Email",
            isRequired: true,
          },
        }}
        onError={(error) => console.log("error")}
      >
        <FormInput
          inputType={INPUT_TYPE.TEXT}
          type="email"
          label="Email Address"
          id="email"
          name="email"
          error={emailError}
          disabled={isSubmitting}
          maxLength={INPUT_SETTINGS.email.maxLength}
          autoComplete="email"
          value={email}
          onChange={(val) => setEmail(val)}
          isRequired
          autoFocus
        />
      </Form>
    </BaseAuthentication>
  );
}
