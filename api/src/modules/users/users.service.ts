import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { PrismaService } from '~/modules/utils/prisma';

export const SENSITIVE_USER_VALUES: Array<
  keyof Pick<User, 'hashedPassword' | 'twoFactorEnabled'>
> = ['hashedPassword', 'twoFactorEnabled'];

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Find a user with the given email address
   *
   * @param email - The email to find a user with
   * @returns `null` if a user was not found. A `User` if a user was found
   */
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  /**
   * Find a user with the given ID
   *
   * @param userId - The ID of the user
   * @returns `null` if a user was not found. A `User` if a user was found
   */
  async findUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
