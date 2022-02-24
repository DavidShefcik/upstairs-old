export enum ErrorMessages {
  // General
  UNAUTHORIZED = "unauthorized",
  INTERNAL_SERVER_ERROR = "internal-server-error",
  // Data validation
  INVALID_EMAIL = "invalid-email",
  INVALID_PASSWORD = "invalid-password",
  INVALID_NAME = "invalid-name",
  // Login
  USER_NOT_FOUND = "user-not-found",
  INCORRECT_PASSWORD = "incorrect-password",
  PASSWORDS_DO_NOT_MATCH = "passwords-do-not-match",
  // Register
  EMAIL_ALREADY_IN_USE = "email-already-in-use",
}

export const humanReadableErrorMessages: Record<ErrorMessages, string> = {
  // General
  [ErrorMessages.UNAUTHORIZED]: "You must be logged in to do this!",
  [ErrorMessages.INTERNAL_SERVER_ERROR]:
    "Something unexpected happened! Please try again.",
  // Data validation
  [ErrorMessages.INVALID_EMAIL]: "Email is invalid!",
  [ErrorMessages.INVALID_PASSWORD]: "Password is invalid!",
  [ErrorMessages.INVALID_NAME]: "Name is invalid!",
  // Login
  [ErrorMessages.USER_NOT_FOUND]: "User not found!",
  [ErrorMessages.INCORRECT_PASSWORD]: "Incorrect password!",
  [ErrorMessages.PASSWORDS_DO_NOT_MATCH]: "Passwords do not match!",
  // Register
  [ErrorMessages.EMAIL_ALREADY_IN_USE]: "That email is already in use!",
};
