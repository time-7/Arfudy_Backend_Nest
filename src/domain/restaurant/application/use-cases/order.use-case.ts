import { Order } from '../../enterprise/entities/order';
import { OrdersRepository } from '../repositories/orders.repository';
import { ServicesRepository } from '../repositories/services.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { OrderRequestDto } from '@infra/http/dtos/order.request.dto';
import { Product } from '@domain/restaurant/enterprise/entities/value-objects/products';
import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { TablesRepository } from '../repositories/table.repository';
import { OrdersGateway, newOrderBody } from '../gateways/orders.gateway';

export interface OrderUseCaseRequest extends OrderRequestDto {
  clientToken: string;
}

@Injectable()
export class OrderUseCase {
  constructor(
    private readonly tablesRepository: TablesRepository,
    private readonly servicesRepository: ServicesRepository,
    private readonly ordersRepository: OrdersRepository,
    private readonly ordersGateway: OrdersGateway,
  ) {}

  async execute({ products, clientToken, serviceId }: OrderUseCaseRequest) {
    const service = await this.servicesRepository.findById(serviceId);
    if (!service) throw new ResourceNotFoundError('Atendimento não encontrado');

    const table = await this.tablesRepository.findById(
      service.tableId.toString(),
    );
    if (!table) throw new ResourceNotFoundError('Mesa não encontrada');

    const client = service.clients.find(
      (client) => client.clientToken.toString() === clientToken,
    );

    if (!client) throw new ResourceNotFoundError('Cliente não encontrado!');

    const order = Order.create({
      products: products.map((product) =>
        Product.create({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          category: product.category,
          date: product.date,
        }),
      ),
      serviceId: UniqueEntityId.createFromRawId(serviceId),
      clientToken: client.clientToken,
    });

    await this.ordersRepository.create(order);

    const body: newOrderBody = {
      data: {
        order: order,
        client: client,
        service: service,
        table: table,
      },
    };

    this.ordersGateway.registerNewOrder(body);
  }
}
