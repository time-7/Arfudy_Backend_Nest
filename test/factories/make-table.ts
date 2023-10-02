import {
  Table,
  TableProps,
} from '@domain/restaurant/enterprise/entities/table';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

export function makeTable(
  override: Partial<TableProps> = {},
  id?: UniqueEntityId,
) {
  return Table.create(
    {
      tableNum: faker.number.int() % 10,
      seatNum: faker.number.int() % 5,
      activeToken: override.activeToken ?? randomUUID(),
    },
    id,
  );
}
