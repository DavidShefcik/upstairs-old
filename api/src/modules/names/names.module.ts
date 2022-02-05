import { Module } from '@nestjs/common';

import { NamesResolver } from './names.resolver';
import { NamesService } from './names.service';

@Module({
  providers: [NamesService, NamesResolver],
})
export class NamesModule {}
