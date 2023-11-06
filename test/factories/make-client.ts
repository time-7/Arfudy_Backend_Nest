import { faker } from '@faker-js/faker';
import { UniqueToken } from '@core/entities/unique-token';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';

export function MakeClient(): Client {
  return Client.create({
    name: faker.person.fullName(),
    isAdmin: true,
    clientToken: UniqueToken.create(),
  });
}
