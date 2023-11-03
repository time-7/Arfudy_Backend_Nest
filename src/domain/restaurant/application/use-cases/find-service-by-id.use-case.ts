import { Injectable } from '@nestjs/common';
import { Service } from '../../enterprise/entities/service';
import { ServicesRepository } from '../repositories/services.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { OrdersRepository } from '../repositories/orders.repository';

interface FindServiceByIdUseCaseRequest {
  id: string;
}

export type FindServiceByIdUseCaseResponse = {
  service: Service;
};

@Injectable()
export class FindServiceByIdUseCase {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute({
    id,
  }: FindServiceByIdUseCaseRequest): Promise<FindServiceByIdUseCaseResponse> {
    const service = await this.servicesRepository.findById(id);
    if (!service)
      throw new ResourceNotFoundError(
        'Nenhum atendimento foi encontrado para o id fornecido',
      );

    return { service };
  }
}
