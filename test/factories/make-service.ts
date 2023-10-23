import { Service } from '@domain/restaurant/enterprise/entities/service';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

export const makeService = (): Service => {
  return Service.create({
    tableId: UniqueEntityId.create().toString(),
    tableToken: randomUUID(),
    hasEnded: false,
    serviceToken: randomUUID(),
    clients: [
      {
        name: faker.person.fullName(),
        isAdmin: true,
        clientToken: randomUUID(),
      },
    ],
  });
};
