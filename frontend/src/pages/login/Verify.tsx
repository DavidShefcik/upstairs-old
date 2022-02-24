import { useState } from "react";
import { gql } from "@apollo/client";

import BaseAuthentication, {
  BaseAuthenticationPinInput,
} from "~/layout/BaseAuthentication";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { verifyLoginFormLinks } from "~/constants/links";

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
    <BaseAuthentication<VerifyLoginFields, VerifyLoginResponse>
      {...{ isSubmitting, setIsSubmitting, onSuccess }}
      title="Verify Login"
      links={verifyLoginFormLinks}
      data={{
        code,
      }}
      mutation={VERIFY_LOGIN_MUTATION}
      setErrors={{
        code: setCodeError,
      }}
      fields={{
        code: {
          fieldName: "Authenticator code",
          isRequired: true,
        },
      }}
      onError={(error) => console.log("error")}
    >
      <BaseAuthenticationPinInput
        label="Authenticator Code"
        name="code"
        error={codeError}
        disabled={isSubmitting}
        value={code}
        onChange={(value) => setCode(value)}
        isRequired
        autoFocus
        onComplete={() => console.log("Done")}
      />
    </BaseAuthentication>
  );
}
