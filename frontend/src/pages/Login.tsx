import { useState } from "react";
import { gql } from "@apollo/client";

import BaseAuthentication, {
  BaseAuthenticationInput,
} from "~/layout/BaseAuthentication";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { loginFormLinks } from "~/constants/links";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <BaseAuthentication<{ email: string; password: string }>
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
    >
      <BaseAuthenticationInput
        type="email"
        label="Email Address"
        name="email"
        error={emailError}
        disabled={isSubmitting}
        maxLength={INPUT_SETTINGS.email.maxLength}
        autoComplete="username"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoFocus
        isRequired
      />
      <BaseAuthenticationInput
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
