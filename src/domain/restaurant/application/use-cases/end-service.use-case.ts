import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '../repositories/services.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { GivenClientIsNotAdminError } from './errors/client-is-not-admin.error';
import { TablesRepository } from '../repositories/table.repository';

export interface EndServiceUseCaseRequest {
  serviceId: string;
  clientToken: string;
}

@Injectable()
export class EndServiceUseCase {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly tablesRepository: TablesRepository,
  ) {}

  async execute({ serviceId, clientToken }: EndServiceUseCaseRequest) {
    console.log(serviceId, clientToken);
  }
}
