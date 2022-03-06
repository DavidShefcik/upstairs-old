import {
  Query,
  Context,
  GraphQLExecutionContext,
  Resolver,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import _omit from 'lodash.omit';

import { CurrentUser, ICurrentUser } from '~/decorators/CurrentUser';
import { UnauthorizedError } from '~/exceptions/general';
import { UsersService, SENSITIVE_USER_VALUES } from './users.service';
import { User as GraphQLUser } from '~/graphql';

type ReturnUser = Omit<GraphQLUser, 'hashedPassword' | 'twoFactorEnabled'>;

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  async currentUser(
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<ReturnUser | void> {
    const { userId } = currentUser;

    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new UnauthorizedError();
    }

    const userWithoutSensitiveFields = _omit(user, SENSITIVE_USER_VALUES);

    return {
      ...userWithoutSensitiveFields,
      fullName: `${user.firstName} ${user.lastName}`,
    };
  }
}
