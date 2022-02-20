import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '~/modules/utils/prisma';

type ReturnUser = Omit<User, 'hashedPassword' | 'twoFactorEnabled'>;

interface IFindUserByEmailArgs {
  email: string;
  extraFields?: [keyof Omit<User, 'id' | 'firstName' | 'lastName' | 'email'>];
}

const SAFE_USER_DATA_SELECT: Record<keyof ReturnUser, boolean> = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Find a user with the given email address
   *
   * @param email - The email to find a user with
   * @returns `null` if a user was not found. A `User` if a user was found
   */
  async findUserByEmail({
    email,
    extraFields,
  }: IFindUserByEmailArgs): Promise<ReturnUser | null> {
    const select = SAFE_USER_DATA_SELECT;

    extraFields.forEach((field: string) => {
      select[field] = true;
    });

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select,
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
