import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { Order } from '@domain/restaurant/enterprise/entities/order';
import { Table } from '@domain/restaurant/enterprise/entities/table';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';
import { TablesRepository } from '../repositories/table.repository';
import { ServicesRepository } from '../repositories/services.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { Service } from '@domain/restaurant/enterprise/entities/service';

export type FindAllOrdersByTableIdUseCaseRequest = {
  tableId: string;
};

export type FindAllOrdersByTableIdUseCaseResponse = {
  response: {
    order: Order;
    table: Table;
    service: Service;
    client: Client;
  }[];
};

@Injectable()
export class FindAllOrdersByTableIdUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly tablesRepository: TablesRepository,
    private readonly servicesRepository: ServicesRepository,
  ) {}

  async execute({
    tableId,
  }: FindAllOrdersByTableIdUseCaseRequest): Promise<FindAllOrdersByTableIdUseCaseResponse> {
    const table = await this.tablesRepository.findById(tableId);
    if (!table)
      throw new ResourceNotFoundError(`Mesa ${tableId} não encontrada!`);

    const service = await this.servicesRepository.findByTableToken(
      table.activeToken.toString(),
    );
    if (!service)
      throw new ResourceNotFoundError(
        'Nenhum atendimento iniciado para esta mesa!',
      );

    const orders = await this.ordersRepository.findManyByServiceId(
      service.id.toString(),
    );

    const response = orders.map((order) => {
      const client = service.clients.find(
        (client) =>
          client.clientToken.toString() === order.clientToken.toString(),
      );
      return {
        order,
        client,
        service,
        table,
      };
    });

    return { response };
  }
}
