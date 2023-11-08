import { Order } from '../../enterprise/entities/order';

export abstract class OrdersRepository {
  abstract create(order: Order): Promise<void>;
  abstract save(order: Order): Promise<void>;
  abstract findManyByServiceId(serviceId: string): Promise<Order[] | null>;
  abstract findById(id: string): Promise<Order | null>;
  abstract findMany(): Promise<Order[]>;
}
