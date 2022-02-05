import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Name } from '~/graphql';
import { NamesService } from './names.service';

@Resolver('Name')
export class NamesResolver {
  constructor(private readonly namesService: NamesService) {}

  @Query('allNames')
  getAllNames(): Name[] {
    return this.namesService.getAll();
  }

  @Query('name')
  getName(@Args('name') name: string): Name | void {
    const foundName = this.namesService.getName(name);

    if (!foundName) {
      throw new HttpException('name-not-found', HttpStatus.NOT_FOUND);
    }

    return foundName;
  }

  @Mutation()
  createName(@Args('name') name: string) {
    return this.namesService.createName(name);
  }
}
