import { RepositoryProtocol } from '@core/protocols/repository.protocol';
import { Service } from '../../enterprise/entities/service';
import { Client } from '../../enterprise/entities/value-objects/client';

export abstract class ServicesRepository
  implements RepositoryProtocol<Service>
{
  abstract create(entity: Service): Promise<void>;
  abstract findMany(): Promise<Service[]>;
  abstract findById(id: string): Promise<Service>;
  abstract findByTableToken(tableToken: string): Promise<Service | null>;
  abstract addClient(service: Service, client: Client): Promise<void>;
  abstract save(entity: Service): Promise<void>;
  abstract delete(entity: Service): Promise<void>;
}
