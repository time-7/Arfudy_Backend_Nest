import { OrdersRepository } from '@domain/restaurant/application/repositories/orders.repository';
import { Order } from '@domain/restaurant/enterprise/entities/order';

export class InMemoryOrdersRepository implements OrdersRepository {
  items: Order[] = [];

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id);
    if (!order) return null;

    return order;
  }

  async findManyByServiceId(serviceId: string): Promise<Order[]> {
    const items = this.items.map((item) => {
      if (item.serviceId.toString() === serviceId) return item;
    });

    return items;
  }

  async create(order: Order): Promise<void> {
    this.items.push(order);
  }

  async save(order: Order): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(order.id));

    this.items[index] = order;
  }

  async findMany(): Promise<Order[]> {
    const orders = this.items;

    return orders;
  }
}
