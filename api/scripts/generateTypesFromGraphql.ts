import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { cwd } from 'process';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(cwd(), 'src/graphql.ts'),
  watch: true,
});
