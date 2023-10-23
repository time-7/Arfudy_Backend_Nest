import { ServicesRepository } from '@domain/restaurant/application/repositories/services.repository';
import { Service } from '../../src/domain/restaurant/enterprise/entities/service';

export class InMemoryServicesRepository implements ServicesRepository {
  items: Service[] = [];

  async create(entity: Service): Promise<void> {
    await this.items.push(entity);
  }

  findMany(): Promise<Service[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Service> {
    throw new Error('Method not implemented.');
  }

  async findByTableToken(tableToken: string): Promise<Service | null> {
    const itemIndex = await this.items.findIndex(
      (item) => item.tableToken === tableToken,
    );
    const service = this.items[itemIndex];
    if (!service) return null;

    return service;
  }

  save(entity: Service): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(entity: Service): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
