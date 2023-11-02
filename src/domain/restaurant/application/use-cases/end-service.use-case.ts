import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '../repositories/services.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { GivenClientIsNotAdminError } from './errors/client-is-not-admin.error';
import { TablesRepository } from '../repositories/table.repository';

export interface EndServiceUseCaseRequest {
  id: string;
  clientToken: string;
}

@Injectable()
export class EndServiceUseCase {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly tablesRepository: TablesRepository,
  ) {}

  async execute({ id, clientToken }: EndServiceUseCaseRequest) {
    const service = await this.servicesRepository.findById(id);

    if (!service)
      throw new ResourceNotFoundError('Atendimento não encontrado!');

    const admin = service.clients.find((client) => client.isAdmin);
    if (admin.clientToken.toString() !== clientToken)
      throw new GivenClientIsNotAdminError(
        'Cliente fornecido não tem permissão para finalizar o atendimento da mesa',
      );

    const table = await this.tablesRepository.findById(
      service.tableId.toString(),
    );

    service.end();
    table.refreshToken();

    await this.tablesRepository.save(table);
  }
}
