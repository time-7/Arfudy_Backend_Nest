import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { Order } from '@domain/restaurant/enterprise/entities/order';

type FindAllOrdersUseCaseResponse = {
  orders: Order[];
};

@Injectable()
export class FindAllOrdersUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute(): Promise<FindAllOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findMany();

    return { orders };
  }
}
