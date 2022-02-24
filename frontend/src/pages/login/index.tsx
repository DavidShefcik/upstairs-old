import { useState } from "react";
import { ApolloError, gql } from "@apollo/client";

import BaseAuthentication, {
  BaseAuthenticationTextInput,
} from "~/layout/BaseAuthentication";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { loginFormLinks } from "~/constants/links";
import { ErrorMessages, humanReadableErrorMessages } from "~/constants/errors";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      needToVerify
    }
  }
`;

interface LoginFields {
  email: string;
  password: string;
}
interface LoginResponse {
  login: {
    success: boolean;
    needToVerify?: boolean;
  };
}

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSuccess = (data: LoginResponse) => {
    const { success, needToVerify } = data.login;

    console.log({ success, needToVerify });
  };

  const onError = (error: ApolloError) => {
    const { networkError, graphQLErrors } = error;

    if (networkError) {
      setAllErrors(humanReadableErrorMessages["internal-server-error"]);
    } else {
      graphQLErrors.forEach(({ message }) => {
        switch (message) {
          case ErrorMessages.USER_NOT_FOUND:
          case ErrorMessages.INVALID_EMAIL:
            setEmailError(humanReadableErrorMessages[message]);
            break;
          case ErrorMessages.INCORRECT_PASSWORD:
            setPasswordError(humanReadableErrorMessages[message]);
            break;
          default:
            setAllErrors(humanReadableErrorMessages["internal-server-error"]);
        }
      });
    }
  };

  const setAllErrors = (errorMessage: string) => {
    setEmailError(errorMessage);
    setPasswordError(errorMessage);
  };

  return (
    <BaseAuthentication<LoginFields, LoginResponse>
      {...{ isSubmitting, setIsSubmitting, onSuccess }}
      title="Login"
      links={loginFormLinks}
      data={{
        email,
        password,
      }}
      mutation={LOGIN_MUTATION}
      setErrors={{
        email: setEmailError,
        password: setPasswordError,
      }}
      fields={{
        email: {
          fieldName: "Email",
          isRequired: true,
        },
        password: {
          fieldName: "Password",
          isRequired: true,
        },
      }}
      onError={onError}
    >
      <BaseAuthenticationTextInput
        type="email"
        label="Email Address"
        name="email"
        error={emailError}
        disabled={isSubmitting}
        maxLength={INPUT_SETTINGS.email.maxLength}
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoFocus
        isRequired
      />
      <BaseAuthenticationTextInput
        type="password"
        label="Password"
        name="password"
        error={passwordError}
        disabled={isSubmitting}
        maxLength={INPUT_SETTINGS.password.maxLength}
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        isRequired
      />
    </BaseAuthentication>
  );
}
