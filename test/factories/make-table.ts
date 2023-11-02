import {
  Table,
  TableProps,
} from '@domain/restaurant/enterprise/entities/table';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { faker } from '@faker-js/faker';
import { UniqueToken } from '@core/entities/unique-token';

export function makeTable(
  override: Partial<TableProps> = {},
  id?: UniqueEntityId,
) {
  return Table.create(
    {
      tableNum: faker.number.int() % 10,
      seatNum: faker.number.int() % 5,
      activeToken: override.activeToken ?? UniqueToken.create(),
    },
    id,
  );
}
