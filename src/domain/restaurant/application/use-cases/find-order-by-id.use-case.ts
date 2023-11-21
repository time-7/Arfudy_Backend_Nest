import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { Order } from '@domain/restaurant/enterprise/entities/order';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';
import { ServicesRepository } from '../repositories/services.repository';
import { TablesRepository } from '../repositories/table.repository';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { Table } from '@domain/restaurant/enterprise/entities/table';

export interface FindOrderByIdUseCaseRequest {
  id: string;
}

export interface FindOrderByIdUseCaseResponse {
  response: {
    order: Order;
    client: Client;
    service: Service;
    table: Table;
  };
}

@Injectable()
export class FindOrderByIdUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly servicesRepository: ServicesRepository,
    private readonly tablesRepository: TablesRepository,
  ) {}

  async execute({
    id,
  }: FindOrderByIdUseCaseRequest): Promise<FindOrderByIdUseCaseResponse> {
    const order = await this.ordersRepository.findById(id);
    if (!order) throw new ResourceNotFoundError('Pedido não encontrado!');

    const service = await this.servicesRepository.findById(
      order.serviceId.toString(),
    );

    const client = service.clients.find(
      (client) =>
        client.clientToken.toString() === order.clientToken.toString(),
    );

    const table = await this.tablesRepository.findById(
      service.tableId.toString(),
    );

    return {
      response: {
        order,
        client,
        service,
        table,
      },
    };
  }
}
