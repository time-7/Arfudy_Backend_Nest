import { OrdersRepository } from '@domain/restaurant/application/repositories/orders.repository';
import { Order } from '@domain/restaurant/enterprise/entities/order';
import { Injectable } from '@nestjs/common';
import { PrismaOrderMapper } from '../mappers/prisma-order.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Order> {
    const order = await this.prisma.order.findFirst({ where: { id } });
    if (!order) return null;

    return PrismaOrderMapper.toDomain(order);
  }

  async findMany(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();

    return orders.map(PrismaOrderMapper.toDomain);
  }

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order);

    await this.prisma.order.create({ data });
  }

  async findManyByServiceId(serviceId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({ where: { serviceId } });

    return orders.map(PrismaOrderMapper.toDomain);
  }

  async save(order: Order): Promise<void> {
    throw new Error('Method not implemented!');
  }
}
