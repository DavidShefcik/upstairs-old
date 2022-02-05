import { Module } from '@nestjs/common';

import { PrismaModule } from '../utils/prisma';
import { NamesResolver } from './names.resolver';
import { NamesService } from './names.service';

@Module({
  imports: [PrismaModule],
  providers: [NamesService, NamesResolver],
})
export class NamesModule {}
