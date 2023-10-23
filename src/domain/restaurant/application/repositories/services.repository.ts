import { RepositoryProtocol } from '@core/protocols/repository.protocol';
import { Service } from '../../enterprise/entities/service';

export abstract class ServicesRepository
  implements RepositoryProtocol<Service>
{
  abstract create(entity: Service): Promise<void>;
  abstract findMany(): Promise<Service[]>;
  abstract findById(id: string): Promise<Service>;
  abstract findByTableToken(tableToken: string): Promise<Service | null>;
  abstract save(entity: Service): Promise<void>;
  abstract delete(entity: Service): Promise<void>;
}
