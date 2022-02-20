import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
import { cwd } from 'process';

import { JwtAuthModule, JwtAuthGuard } from '~/modules/utils/jwtAuth';
import { NamesModule } from './modules/names';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Packages
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(cwd(), 'src/graphql.ts'),
      },
    }),
    ConfigModule.forRoot(),
    // Utils
    JwtAuthModule,
    // Modules
    NamesModule,
    AuthModule,
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
