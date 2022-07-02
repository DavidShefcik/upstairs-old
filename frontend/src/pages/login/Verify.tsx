import { useState } from "react";
import { gql } from "@apollo/client";

import BaseAuthentication from "~/layout/BaseAuthentication";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { verifyLoginFormLinks } from "~/constants/links";
import Form from "~/components/inputs/Form";
import FormInput, { InputType } from "~/components/inputs/FormInput";

const VERIFY_LOGIN_MUTATION = gql`
  mutation VerifyLoginMutation($code: String!) {
    verifyLogin(code: $code) {
      token
    }
  }
`;

interface VerifyLoginFields {
  code: string;
}
interface VerifyLoginResponse {
  token: string;
}

export default function VerifyLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code, setCode] = useState("");

  const [codeError, setCodeError] = useState("");

  const onSuccess = (data: VerifyLoginResponse) => {
    const { token } = data;

    console.log({ token });
  };

  return (
    <BaseAuthentication title="Verify Login" links={verifyLoginFormLinks}>
      <Form<VerifyLoginFields, VerifyLoginResponse>
        {...{ isSubmitting, onSuccess }}
        submitButtonText="Verify Login"
        showSubmitButton
        data={{
          code,
        }}
        mutation={VERIFY_LOGIN_MUTATION}
        setErrors={{
          code: (error) => setCodeError(error),
        }}
        fields={{
          code: {
            fieldName: "Authenticator code",
            isRequired: true,
          },
        }}
        onError={(error) => console.log("error")}
        setIsSubmitting={(val) => setIsSubmitting(val)}
      >
        <FormInput
          inputType={InputType.PIN}
          label="Authenticator Code"
          id="code"
          name="code"
          valueLength={6}
          error={codeError}
          disabled={isSubmitting}
          value={code}
          onChange={(value) => setCode(value)}
          autoFocus
          onComplete={() => console.log("Done")}
        />
      </Form>
    </BaseAuthentication>
  );
}
