import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { UsersModule } from '~/modules/users';
import { PrismaModule } from '../prisma';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PassportModule,
    NestJwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [JwtStrategy, JwtService],
  exports: [JwtService],
})
export class JwtModule {}
