import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorMessage } from '~/constants/errorMessages';

/**
 * ===============
 * Data validation
 * ===============
 */
export class InvalidEmail extends HttpException {
  constructor() {
    super(ErrorMessage.INVALID_EMAIL, HttpStatus.NOT_FOUND);
  }
}
export class InvalidName extends HttpException {
  constructor() {
    super(ErrorMessage.INVALID_NAME, HttpStatus.NOT_FOUND);
  }
}
export class InvalidPassword extends HttpException {
  constructor() {
    super(ErrorMessage.INVALID_PASSWORD, HttpStatus.NOT_FOUND);
  }
}

/**
 * ===============
 * Login
 * ===============
 */
// This error is thrown during login when the requested user does not exist
export class UserNotFoundError extends HttpException {
  constructor() {
    super(ErrorMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
// This error is thrown during login when the password is incorrect
export class IncorrectPasswordError extends HttpException {
  constructor() {
    super(ErrorMessage.INCORRECT_PASSWORD, HttpStatus.BAD_REQUEST);
  }
}

/**
 * ===============
 * Register
 * ===============
 */
// This error is thrown during registration when an email is already in use
export class EmailInUseError extends HttpException {
  constructor() {
    super(ErrorMessage.EMAIL_ALREADY_IN_USE, HttpStatus.CONFLICT);
  }
}
