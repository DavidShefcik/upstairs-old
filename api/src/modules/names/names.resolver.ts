import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Public } from '~/decorators/Public';
import { Name } from '~/graphql';
import { NamesService } from './names.service';

@Resolver('Name')
@Public()
export class NamesResolver {
  constructor(private readonly namesService: NamesService) {}

  @Query('allNames')
  async getAllNames(): Promise<Name[]> {
    return await this.namesService.getAll();
  }

  @Query('name')
  async getName(@Args('name') name: string): Promise<Name | void> {
    const foundName = this.namesService.getName(name);

    if (!foundName) {
      throw new HttpException('name-not-found', HttpStatus.NOT_FOUND);
    }

    return foundName;
  }

  @Mutation()
  async createName(@Args('name') name: string) {
    return await this.namesService.createName(name);
  }
}
