import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '../repositories/services.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { GivenClientIsNotAdminError } from './errors/client-is-not-admin.error';

export interface EndServiceUseCaseRequest {
  id: string;
  clientToken: string;
}

@Injectable()
export class EndServiceUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async handle({ id, clientToken }: EndServiceUseCaseRequest) {
    const service = await this.servicesRepository.findById(id);

    if (!service)
      throw new ResourceNotFoundError('Atendimento não encontrado!');

    const admin = service.clients.find((client) => client.isAdmin);
    if (admin.clientToken !== clientToken)
      throw new GivenClientIsNotAdminError(
        'Cliente fornecido não tem permissão para finalizar o atendimento da mesa',
      );

    service.end();
  }
}
