import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { PrismaService } from './modules/utils/prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT);

  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService: PrismaService = app.get(PrismaService);

  prismaService.enableShutdownHooks(app);
}
bootstrap();
