import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import _omit from 'lodash.omit';

import { JwtService } from '~/modules/utils/jwt';

import { LoginResponse, User as GraphQLUser } from '~/graphql';
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
const SENSITIVE_USER_VALUES = ['hashedPassword', 'twoFactorEnabled'];

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
        success: false,
        needToVerify: true,
      };
    }

    const token = this.jwtService.generateJWT({
      email,
      userId: user.id,
    });

    const userToReturn = _omit(user, SENSITIVE_USER_VALUES) as GraphQLUser;

    return {
      success: true,
      needToVerify: false,
      token,
      user: {
        ...userToReturn,
        fullName: `${user.firstName} ${user.lastName}`,
      },
    };
  }

  /**
   * Function to try and register a user with the given email,
   * first name, last name, and password.
   *
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
  async register({
    email,
    firstName,
    lastName,
    password,
  }: IRegisterArgs): Promise<LoginResponse> {
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
    });

    // Generate token
    const token = this.jwtService.generateJWT({
      email: newUser.email,
      userId: newUser.id,
    });

    const userToReturn = _omit(newUser, SENSITIVE_USER_VALUES) as GraphQLUser;

    return {
      success: true,
      token,
      user: {
        ...userToReturn,
        fullName: `${userToReturn.firstName} ${userToReturn.lastName}`,
      },
    };
  }
}
