import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { Order } from '@domain/restaurant/enterprise/entities/order';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

export interface FindOrderByIdUseCaseRequest {
  id: string;
}

export interface FindOrderByIdUseCaseResponse {
  order: Order;
}

@Injectable()
export class FindOrderByIdUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    id,
  }: FindOrderByIdUseCaseRequest): Promise<FindOrderByIdUseCaseResponse> {
    const order = await this.ordersRepository.findById(id);
    if (!order) throw new ResourceNotFoundError('Pedido não encontrado!');

    return { order };
  }
}
