import {
  Service,
  ServiceProps,
} from '@domain/restaurant/enterprise/entities/service';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { UniqueToken } from '@core/entities/unique-token';
import { MakeClient } from './make-client';
import { makeTable } from './make-table';

export const makeService = (
  override: Partial<ServiceProps> = {},
  id?: UniqueEntityId,
): Service => {
  const table = makeTable();
  return Service.create(
    {
      tableId: override.tableId ?? table.id,
      tableToken: override.tableToken ?? table.activeToken,
      hasEnded: false,
      serviceToken: override.serviceToken ?? UniqueToken.create(),
      clients: [MakeClient()],
    },
    id ?? UniqueEntityId.create(),
  );
};
