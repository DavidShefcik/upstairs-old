import { Module } from '@nestjs/common';

import { PrismaModule } from '~/modules/utils/prisma';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
