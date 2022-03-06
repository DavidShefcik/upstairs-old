import { Module } from '@nestjs/common';

import { PrismaModule } from '~/modules/utils/prisma';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
