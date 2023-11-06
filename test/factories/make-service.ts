import {
  Service,
  ServiceProps,
} from '@domain/restaurant/enterprise/entities/service';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { UniqueToken } from '@core/entities/unique-token';
import { MakeClient } from './make-client';

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
      clients: [MakeClient()],
    },
    id ?? UniqueEntityId.create(),
  );
};
