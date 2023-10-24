import {
  Service,
  ServiceProps,
} from '@domain/restaurant/enterprise/entities/service';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { faker } from '@faker-js/faker';
import { UniqueToken } from '../../src/core/entities/unique-token';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';

export const makeService = (
  override: Partial<ServiceProps> = {},
  id?: UniqueEntityId,
): Service => {
  return Service.create(
    {
      tableId: override.tableId ?? UniqueEntityId.create(),
      tableToken: override.tableToken ?? UniqueToken.create(),
      hasEnded: false,
      serviceToken: override.serviceToken ?? UniqueToken.create(),
      clients: [
        Client.create({
          name: faker.person.fullName(),
          isAdmin: true,
          clientToken: UniqueToken.create(),
        }),
      ],
    },
    id,
  );
};
