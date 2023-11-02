import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { ServicesRepository } from '../repositories/services.repository';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';

export interface JoinServiceUseCaseRequest {
  tableToken: string;
  client: { name: string };
}

export interface JoinServiceUseCaseResponse {
  clientToken: string;
}

@Injectable()
export class JoinServiceUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute({
    tableToken,
    client,
  }: JoinServiceUseCaseRequest): Promise<JoinServiceUseCaseResponse> {
    const service = await this.servicesRepository.findByTableToken(tableToken);
    if (!service) throw new ResourceNotFoundError();

    const newclient = Client.create({ name: client.name, isAdmin: false });

    service.clients.push(newclient);

    await this.servicesRepository.save(service);

    return { clientToken: newclient.clientToken.toString() };
  }
}
