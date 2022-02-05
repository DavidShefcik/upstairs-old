import { Injectable } from '@nestjs/common';

import { Name } from '~/graphql';
import { PrismaService } from '~/modules/utils/prisma';

@Injectable()
export class NamesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Name[]> {
    return await this.prismaService.names.findMany({});
  }

  async getName(requestedName: string): Promise<Name | undefined> {
    const foundName = await this.prismaService.names.findFirst({
      where: {
        name: requestedName,
      },
    });

    return foundName;
  }

  async createName(name: string): Promise<Name> {
    const newName = await this.prismaService.names.create({
      data: {
        name,
      },
    });

    return newName;
  }
}
