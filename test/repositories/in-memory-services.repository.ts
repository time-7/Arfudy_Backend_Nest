import { ServicesRepository } from '@domain/restaurant/application/repositories/services.repository';
import { Service } from '@domain/restaurant/enterprise/entities/service';

export class InMemoryServicesRepository implements ServicesRepository {
  items: Service[] = [];

  async create(entity: Service): Promise<void> {
    await this.items.push(entity);
  }

  async findMany(): Promise<Service[]> {
    return await this.items;
  }

  async findById(id: string): Promise<Service> {
    const service = await this.items.find((item) => item.id.toString() === id);
    if (!service) return null;

    return service;
  }

  async findByTableToken(tableToken: string): Promise<Service | null> {
    const itemIndex = await this.items.findIndex(
      (item) => item.tableToken.toString() === tableToken,
    );
    const service = this.items[itemIndex];
    if (!service) return null;

    return service;
  }

  async save(entity: Service): Promise<void> {
    const index = await this.items.findIndex((item) =>
      item.id.equals(entity.id),
    );

    this.items[index] = entity;
  }

  async delete(entity: Service): Promise<void> {
    const index = await this.items.findIndex((item) =>
      item.id.equals(entity.id),
    );

    this.items.splice(index, 1);
  }
}
