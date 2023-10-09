import { Table } from '@domain/restaurant/enterprise/entities/table';
import { TablesRepository } from '@domain/restaurant/application/repositories/table.repository';

export class InMemoryTablesRepository implements TablesRepository {
  public items: Table[] = [];

  async create(table: Table): Promise<void> {
    this.items.push(table);
  }

  async save(entity: Table): Promise<void> {
    const index = this.items.findIndex((item) => item.id === entity.id);
    this.items[index] = entity;
  }

  findMany(): Promise<Table[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Table | null> {
    const table = this.items.find((item) => item.id.toString() === id);
    if (!table) return null;

    return table;
  }

  async delete(entity: Table): Promise<void> {
    const index = this.items.findIndex((item) => item.id === entity.id);

    this.items.splice(index, 1);
  }
}
