import { UniqueToken } from '@core/entities/unique-token';
import { Order } from '../../enterprise/entities/order';
import { OrdersRepository } from '../repositories/orders.repository';
import { ServicesRepository } from '../repositories/services.repository';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { OrderRequestDto } from '@infra/http/dtos/order.request.dto';
import { Product } from '@domain/restaurant/enterprise/entities/value-objects/products';
import { Injectable } from '@nestjs/common';

export interface OrderUseCaseRequest extends OrderRequestDto {
  clientToken: string;
}

@Injectable()
export class OrderUseCase {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute({ products, clientToken, serviceId }: OrderUseCaseRequest) {
    const service = await this.servicesRepository.findById(serviceId);
    if (!service) throw new ResourceNotFoundError('Atendimento não encontrado');

    const order = Order.create({
      clientToken: UniqueToken.createFromRaw(clientToken),
      products: products.map((product) =>
        Product.create({
          name: product.name,
          quantity: product.quantity,
        }),
      ),
      serviceId: UniqueEntityId.createFromRawId(serviceId),
    });

    await this.ordersRepository.create(order);
  }
}
