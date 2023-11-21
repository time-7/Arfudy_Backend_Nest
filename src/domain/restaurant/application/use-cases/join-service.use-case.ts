import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { ServicesRepository } from '../repositories/services.repository';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';
import { ServicesGateway } from '../gateways/services.gateway';

export interface JoinServiceUseCaseRequest {
  tableToken: string;
  client: { name: string };
}

export interface JoinServiceUseCaseResponse {
  clientToken: string;
}

@Injectable()
export class JoinServiceUseCase {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly servicesGateway: ServicesGateway,
  ) {}

  async execute({
    tableToken,
    client,
  }: JoinServiceUseCaseRequest): Promise<JoinServiceUseCaseResponse> {
    const service = await this.servicesRepository.findByTableToken(tableToken);
    if (!service) throw new ResourceNotFoundError();

    const newclient = Client.create({ name: client.name, isAdmin: false });

    await this.servicesRepository.addClient(service, newclient);

    this.servicesGateway.registerNewClient({
      client,
      serviceId: service.id.toString(),
    });

    return { clientToken: newclient.clientToken.toString() };
  }
}
