import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { cwd } from 'process';

import { JwtModule, JwtAuthGuard } from '~/modules/utils/jwt';
import { NamesModule } from './modules/names';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';

@Module({
  imports: [
    // Packages
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(cwd(), 'src/graphql.ts'),
      },
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    // Utils
    JwtModule,
    // Modules
    NamesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
