export enum ErrorMessage {
  // General
  UNAUTHORIZED = 'unauthorized',
  INTERNAL_SERVER_ERROR = 'internal-server-error',
  // Data validation
  INVALID_EMAIL = 'invalid-email',
  INVALID_PASSWORD = 'invalid-password',
  INVALID_NAME = 'invalid-name',
  // Login
  USER_NOT_FOUND = 'user-not-found',
  INCORRECT_PASSWORD = 'incorrect-password',
  // Register
  EMAIL_ALREADY_IN_USE = 'email-already-in-use',
}
