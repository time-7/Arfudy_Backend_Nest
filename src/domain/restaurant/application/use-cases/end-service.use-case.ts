import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '../repositories/services.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { GivenClientIsNotAdminError } from './errors/client-is-not-admin.error';
import { TablesRepository } from '../repositories/table.repository';
import { OrdersRepository } from '../repositories/orders.repository';
import { Status } from '@domain/restaurant/enterprise/entities/value-objects/products';

export interface EndServiceUseCaseRequest {
  serviceId: string;
  clientToken: string;
}

@Injectable()
export class EndServiceUseCase {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly tablesRepository: TablesRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute({ serviceId, clientToken }: EndServiceUseCaseRequest) {
    const service = await this.servicesRepository.findById(serviceId);

    if (!service) {
      throw new ResourceNotFoundError('resoucerNotFound');
    }

    const admin = service.clients.find((client) => client.isAdmin);

    if (admin.clientToken.toString() !== clientToken) {
      throw new GivenClientIsNotAdminError('Não autorizado!');
    }

    const orders = await this.ordersRepository.findManyByServiceId(
      service.id.toString(),
    );

    orders.forEach(async (order) => {
      order.products.forEach((product) => product.changeStatus(Status.DONE));

      await this.ordersRepository.save(order);
    });

    const table = await this.tablesRepository.findById(
      service.tableId.toString(),
    );

    service.end();

    await this.servicesRepository.save(service);

    table.refreshToken();

    await this.tablesRepository.save(table);
  }
}
