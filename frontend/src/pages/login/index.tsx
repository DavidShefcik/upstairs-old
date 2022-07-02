import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApolloError, gql } from "@apollo/client";

import BaseAuthentication from "~/layout/BaseAuthentication";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { loginFormLinks } from "~/constants/links";
import { ErrorMessages, humanReadableErrorMessages } from "~/constants/errors";
import { CURRENT_USER_FRAGMENT } from "~/fragments/user";
import { useSessionContext } from "~/context/Session";
import Form from "~/components/inputs/Form";
import FormInput, { INPUT_TYPE } from "~/components/inputs/FormInput";

const LOGIN_MUTATION = gql`
  ${CURRENT_USER_FRAGMENT}
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      needToVerify
      user {
        ...CurrentUser
      }
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
    user?: User;
  };
}

export default function Login() {
  const { login } = useSessionContext();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSuccess = (data: LoginResponse) => {
    const { success, needToVerify, user } = data.login;

    // TODO: 2fa verification
    if (success && user) {
      login(user);
      navigate("/");
    }
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
          case ErrorMessages.USER_NOT_FOUND:
          case ErrorMessages.INVALID_EMAIL:
            setEmailError(humanReadableErrorMessages[message]);
            break;
          case ErrorMessages.INCORRECT_PASSWORD:
            setPasswordError(humanReadableErrorMessages[message]);
            break;
          default:
            setAllErrors(
              humanReadableErrorMessages[ErrorMessages.INTERNAL_SERVER_ERROR]
            );
        }
      });
    }
  };

  const setAllErrors = (errorMessage: string) => {
    setEmailError(errorMessage);
    setPasswordError(errorMessage);
  };

  return (
    <BaseAuthentication title="Login" links={loginFormLinks}>
      <Form<LoginFields, LoginResponse>
        {...{ isSubmitting, onSuccess }}
        submitButtonText="Login"
        showSubmitButton
        data={{
          email,
          password,
        }}
        mutation={LOGIN_MUTATION}
        setErrors={{
          email: (error) => setEmailError(error),
          password: (error) => setPasswordError(error),
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
        setIsSubmitting={(val) => setIsSubmitting(val)}
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
          autoFocus
          isRequired
        />
        <FormInput
          inputType={INPUT_TYPE.TEXT}
          type="password"
          label="Password"
          id="password"
          name="password"
          error={passwordError}
          disabled={isSubmitting}
          maxLength={INPUT_SETTINGS.password.maxLength}
          autoComplete="current-password"
          value={password}
          onChange={(val) => setPassword(val)}
          isRequired
        />
      </Form>
    </BaseAuthentication>
  );
}
