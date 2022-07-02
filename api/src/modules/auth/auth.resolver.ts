import {
  Resolver,
  Args,
  Mutation,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { z } from 'zod';
import { CookieOptions } from 'express';
import { DateTime } from 'luxon';

import { Public } from '~/decorators/Public';
import { RequireAuth } from '~/decorators/RequireAuth';
import { LoginResponse, SuccessResponse } from '~/graphql';
import { AuthService } from './auth.service';
import { JwtService } from '~/modules/utils/jwt';
import { UnauthorizedError } from '~/exceptions/general';
import { InvalidEmail, InvalidName, InvalidPassword } from '~/exceptions/auth';
import {
  MAXIMUM_EMAIL_LENGTH,
  MAXIMUM_NAME_LENGTH,
  MAXIMUM_PASSWORD_LENGTH,
} from '~/constants/maxStringLengths';
import { isValidString } from '~/utils/strings';
import { GraphQLContext } from '~/types/utils';

const COOKIE_SETTINGS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'prod',
  expires: DateTime.now()
    .plus({
      days: 30,
    })
    .toJSDate(),
};

@Resolver()
@Public()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly emailSchema = z
    .string()
    .min(1)
    .max(MAXIMUM_EMAIL_LENGTH)
    .email()
    .refine(isValidString);
  private readonly nameSchema = z
    .string()
    .min(1)
    .max(MAXIMUM_NAME_LENGTH)
    .refine(isValidString);
  private readonly passwordSchema = z
    .string()
    .min(1)
    .max(MAXIMUM_PASSWORD_LENGTH)
    .refine(isValidString);

  @Mutation()
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: GraphQLExecutionContext,
  ): Promise<LoginResponse> {
    // Validate data
    const emailIsValid = this.emailSchema.safeParse(email).success;

    if (!emailIsValid) {
      throw new InvalidEmail();
    }

    const loginResult = await this.authService.login({
      email,
      password,
    });

    const { token, needToVerify } = loginResult;

    const { res } = context.getContext<GraphQLContext>();

    if (token) {
      res.cookie('token', token, COOKIE_SETTINGS);

      return {
        success: true,
        ...loginResult,
      };
    } else if (needToVerify) {
      return {
        success: false,
        needToVerify: true,
      };
    }
  }

  // @Mutation()
  // async verifyLogin(@Args('code') code: string): Promise<TokenResponse> {}

  @Mutation()
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Context() context: GraphQLExecutionContext,
  ): Promise<LoginResponse> {
    // Validate data
    const emailIsValid = this.emailSchema.safeParse(email).success;
    const passwordIsValid = this.passwordSchema.safeParse(password).success;
    const firstNameIsValid = this.nameSchema.safeParse(firstName).success;
    const lastNameIsValid = this.nameSchema.safeParse(lastName).success;

    if (!emailIsValid) {
      throw new InvalidEmail();
    }
    if (!passwordIsValid) {
      throw new InvalidPassword();
    }
    if (!firstNameIsValid || !lastNameIsValid) {
      throw new InvalidName();
    }

    const registerResult = await this.authService.register({
      email,
      password,
      firstName,
      lastName,
    });

    const { res } = context.getContext<GraphQLContext>();

    const { token } = registerResult;

    res.cookie('token', token, COOKIE_SETTINGS);

    return {
      ...registerResult,
      success: true,
    };
  }

  // @Mutation()
  // async requestPasswordReset(
  //   @Args('email') email: string,
  // ): Promise<RequestPasswordResetResponse> {}

  // @Mutation()
  // async resetPassword(
  //   @Args('code') code: string,
  //   @Args('password') password: string,
  // ): Promise<SuccessResponse> {}

  @Mutation()
  @RequireAuth()
  async logout(
    @Context() context: GraphQLExecutionContext,
  ): Promise<SuccessResponse> {
    const { req, res } = context.getContext<GraphQLContext>();

    const token = this.jwtService.extractTokenFromRequest(req);

    if (!token) {
      throw new UnauthorizedError();
    }

    const tokenRevoked = await this.jwtService.revokeJWT(token);

    // Remove JWT cookie from frontend client
    res.clearCookie('token');

    return {
      success: tokenRevoked,
    };
  }
}
