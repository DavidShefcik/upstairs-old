import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorMessage } from '~/constants/errorMessages';

/**
 * ===============
 * General
 * ===============
 */
// This error is thrown when the request is unauthorized
export class UnauthorizedError extends HttpException {
  constructor() {
    super(ErrorMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}
