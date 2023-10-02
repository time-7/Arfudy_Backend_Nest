import { Table } from '@domain/restaurant/enterprise/entities/table';
import { TablesRepository } from '@domain/restaurant/application/repositories/table.repository';

export class InMemoryTablesRepository implements TablesRepository {
  public items: Table[] = [];

  async create(table: Table): Promise<void> {
    this.items.push(table);
  }

  findMany(): Promise<Table[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Table> {
    throw new Error('Method not implemented.');
  }

  delete(table: Table): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
