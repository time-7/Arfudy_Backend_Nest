import { Table } from '@domain/restaurant/enterprise/entities/table';
import { RepositoryProtocol } from '@core/protocols/repository.protocol';

export abstract class TablesRepository implements RepositoryProtocol<Table> {
  abstract create(entity: Table): Promise<void>;
  abstract findMany(): Promise<Table[]>;
  abstract findById(id: string): Promise<Table | null>;
  abstract findByToken(activeToken: string): Promise<Table | null>;
  abstract save(entity: Table): Promise<void>;
  abstract delete(entity: Table): Promise<void>;
}
