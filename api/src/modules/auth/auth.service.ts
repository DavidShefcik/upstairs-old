import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

import {
  LoginResponse,
  TokenResponse,
  RequestPasswordResetResponse,
  ResetPasswordResponse,
} from '~/graphql';
import { PrismaService } from '~/modules/utils/prisma';
import {
  UserNotFoundError,
  IncorrectPasswordError,
  EmailInUseError,
} from '~/exceptions/auth';

interface ILoginArgs {
  email: string;
  password: string;
}
interface IRegisterArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const HASH_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Function that attempts to authentication a user with the
   * given email and password.
   *
   * @args Object - See below
   * @args email - The email of the user
   * @args password - The password of the user
   *
   * @throws `UserNotFoundError` - Thrown when the requested user
   * does not exist
   * @throws `IncorrectPasswordError` - Thrown when the password
   * given for the requested user does not exist
   *
   * @returns `LoginResponse` containing a token or if
   * the login requires 2fa authorization
   */
  async login({ email, password }: ILoginArgs): Promise<LoginResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
        twoFactorEnabled: true,
      },
    });

    // Check if user exists
    if (!user) {
      throw new UserNotFoundError();
    }

    // Check if password is correct
    const passwordMatches = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatches) {
      throw new IncorrectPasswordError();
    }

    // Check if user requires 2fa verification
    if (user.twoFactorEnabled) {
      return {
        needToVerify: true,
      };
    }

    // TODO: Generate JWT token
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      token,
    };
  }

  /**
   * Function to try and register a user with the given email,
   * first name, last name, and password.
   *
   * @args Object - See below
   * @args email - The email to register with
   * @args firstName - The first name of the user
   * @args lastName - The last name of the user
   * @args password - The password of the user
   *
   * @throws `EmailInUseError` - Thrown when the given
   * email is already in use
   *
   * @returns `TokenResponse` containing the token of the
   * newly created user to log them in
   */
  async register({ email, firstName, lastName, password }: IRegisterArgs) {
    // Check if user already exists
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!!existingUser) {
      throw new EmailInUseError();
    }

    // Hash and salt password
    const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);

    // Insert user into database
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        firstName,
        lastName,
        hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    // Generate token
    // TODO: Generate JWT token
    const token = this.jwtService.sign({
      sub: newUser.id,
      email: newUser.email,
    });

    return {
      token,
    };
  }
}
