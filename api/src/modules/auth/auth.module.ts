import { Module } from '@nestjs/common';

import { PrismaModule } from '~/modules/utils/prisma';
import { JwtModule } from '~/modules/utils/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
