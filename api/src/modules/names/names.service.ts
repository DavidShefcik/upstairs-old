import { Injectable } from '@nestjs/common';

import { Name } from '~/graphql';

@Injectable()
export class NamesService {
  private names: Name[] = [
    {
      id: '1',
      name: 'David',
    },
    {
      id: '2',
      name: 'Beta',
    },
  ];

  constructor() {}

  getAll(): Name[] {
    return this.names;
  }

  getName(requestedName: string): Name | undefined {
    const foundName = this.names.find(({ name }) => name === requestedName);

    return foundName;
  }

  createName(name: string): Name {
    const newName: Name = {
      id: new Date().getTime().toString(),
      name,
    };

    this.names.push(newName);

    return newName;
  }
}
