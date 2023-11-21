import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';
import { Order } from '@domain/restaurant/enterprise/entities/order';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { Table } from '@domain/restaurant/enterprise/entities/table';
import { ServicesRepository } from '../repositories/services.repository';
import { TablesRepository } from '../repositories/table.repository';

export type FindAllOrdersUseCaseResponse = {
  response: {
    order: Order;
    client: Client;
    service: Service;
    table: Table;
  }[];
};

@Injectable()
export class FindAllOrdersUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly servicesRepository: ServicesRepository,
    private readonly tablesRepository: TablesRepository,
  ) {}

  async execute(): Promise<FindAllOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findMany();
    const services = await this.servicesRepository.findMany();
    const tables = await this.tablesRepository.findMany();

    const response = orders.map((order) => {
      const service = services.find((service) =>
        service.id.equals(order.serviceId),
      );

      const table = tables.find((table) => table.id.equals(service.tableId));

      return {
        order,
        service,
        client: service.clients.find(
          (client) =>
            client.clientToken.toString() === order.clientToken.toString(),
        ),
        table,
      };
    });

    return { response };
  }
}
