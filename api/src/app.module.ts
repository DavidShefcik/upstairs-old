import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { cwd } from 'process';

import { NamesModule } from './modules/names';

@Module({
  imports: [
    // Packages
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(cwd(), 'src/graphql.ts'),
      },
    }),
    // Modules
    NamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
