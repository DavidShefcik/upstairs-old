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
import {
  LoginResponse,
  RequestPasswordResetResponse,
  ResetPasswordResponse,
} from '~/graphql';
import { AuthService } from './auth.service';
import {
  MAXIMUM_EMAIL_LENGTH,
  MAXIMUM_NAME_LENGTH,
  MAXIMUM_PASSWORD_LENGTH,
} from '~/constants/maxStringLengths';
import { InvalidEmail, InvalidName, InvalidPassword } from '~/exceptions/auth';
import { isValidString } from '~/utils/strings';

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
  constructor(private readonly authService: AuthService) {}

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

    if (token) {
      // @ts-ignore
      context.res.cookie('token', token, COOKIE_SETTINGS);

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

    const { token } = registerResult;

    // @ts-ignore
    context.res.cookie('token', token, COOKIE_SETTINGS);

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
  // ): Promise<ResetPasswordResponse> {}
}
