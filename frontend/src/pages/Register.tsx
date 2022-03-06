import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, ApolloError } from "@apollo/client";
import { Text, Link as ChakraLink } from "@chakra-ui/react";

import BaseAuthentication, {
  BaseAuthenticationTextInput,
} from "~/layout/BaseAuthentication";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { registerFormLinks } from "~/constants/links";
import { ErrorMessages, humanReadableErrorMessages } from "~/constants/errors";
import { CURRENT_USER_FRAGMENT } from "~/fragments/user";
import { useSessionContext } from "~/context/Session";

const REGISTER_MUTATION = gql`
  ${CURRENT_USER_FRAGMENT}
  mutation RegisterMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      success
      user {
        ...CurrentUser
      }
    }
  }
`;

interface RegisterFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface RegisterResponse {
  register: {
    success: boolean;
    user: User;
  };
}

export default function Register() {
  const { login } = useSessionContext();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const onSuccess = (data: RegisterResponse) => {
    const { success, user } = data.register;

    if (success) {
      login(user);
      navigate("/");
    }
  };

  const onError = (error: ApolloError) => {
    const { networkError, graphQLErrors } = error;

    if (networkError) {
      setAllErrors(humanReadableErrorMessages["internal-server-error"]);
    } else {
      graphQLErrors.forEach(({ message }) => {
        switch (message) {
          case ErrorMessages.INVALID_EMAIL:
          case ErrorMessages.EMAIL_ALREADY_IN_USE:
            setEmailError(humanReadableErrorMessages[message]);
            break;
          default:
            setAllErrors(humanReadableErrorMessages["internal-server-error"]);
        }
      });
    }
  };

  const customValidation = (): boolean => {
    if (password !== confirmPassword) {
      setPasswordError(
        humanReadableErrorMessages[ErrorMessages.PASSWORDS_DO_NOT_MATCH]
      );
      setConfirmPasswordError(
        humanReadableErrorMessages[ErrorMessages.PASSWORDS_DO_NOT_MATCH]
      );

      return false;
    }

    return true;
  };

  const setAllErrors = (errorMessage: string) => {
    setEmailError(errorMessage);
    setFirstNameError(errorMessage);
    setLastNameError(errorMessage);
    setPasswordError(errorMessage);
    setConfirmPasswordError(errorMessage);
  };

  return (
    <BaseAuthentication<RegisterFields, RegisterResponse>
      {...{ isSubmitting, setIsSubmitting, onSuccess }}
      title="Register"
      links={registerFormLinks}
      data={{
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }}
      mutation={REGISTER_MUTATION}
      setErrors={{
        firstName: setFirstNameError,
        lastName: setLastNameError,
        email: setEmailError,
        password: setPasswordError,
        confirmPassword: setConfirmPasswordError,
      }}
      fields={{
        firstName: {
          fieldName: "First name",
          isRequired: true,
        },
        lastName: {
          fieldName: "Last name",
          isRequired: true,
        },
        email: {
          fieldName: "Email",
          isRequired: true,
        },
        password: {
          fieldName: "Password",
          isRequired: true,
        },
        confirmPassword: {
          fieldName: "Confirm password",
          isRequired: true,
        },
      }}
      onError={onError}
      customValidation={customValidation}
    >
      <BaseAuthenticationTextInput
        type="text"
        label="First Name"
        name="firstName"
        error={firstNameError}
        disabled={isSubmitting}
        maxLength={INPUT_SETTINGS.name.maxLength}
        autoComplete="given-name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        autoFocus
        isRequired
      />
      <BaseAuthenticationTextInput
        type="text"
        label="Last Name"
        name="lastName"
        error={lastNameError}
        disabled={isSubmitting}
        maxLength={INPUT_SETTINGS.name.maxLength}
        autoComplete="family-name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        isRequired
      />
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
        isRequired
      />
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
      <Text fontSize="sm">
        By clicking "Register" you agree to our{" "}
        <ChakraLink as={Link} to="/tos" title="Terms of Service" color="brand">
          terms
        </ChakraLink>
      </Text>
    </BaseAuthentication>
  );
}
