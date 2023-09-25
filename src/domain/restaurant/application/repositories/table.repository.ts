import { Table } from '@domain/restaurant/enterprise/entities/table';

export abstract class TablesRepository {
  abstract create(table: Table): Promise<void>;
  abstract findMany(): Promise<Table[]>;
  abstract findById(id: string): Promise<Table | null>;
  abstract delete(table: Table): Promise<void>;
}
