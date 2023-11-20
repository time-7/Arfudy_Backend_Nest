import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { Status } from '@domain/restaurant/enterprise/entities/value-objects/products';

export type ChangeOrdersProductStatusUseCaseRequest = {
  orderId: string;
  productId: string;
  status: string;
};

@Injectable()
export class ChangeOrdersProductStatusUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
    productId,
    status,
  }: ChangeOrdersProductStatusUseCaseRequest) {
    const order = await this.ordersRepository.findById(orderId);
    if (!order)
      throw new ResourceNotFoundError(`Pedido ${orderId} não encontrado!`);

    const product = order.products.find(
      (item) => item.id.toString() === productId,
    );

    product.changeStatus(status as Status);

    await this.ordersRepository.save(order);
  }
}
