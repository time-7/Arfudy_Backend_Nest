import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '../repositories/services.repository';
import { Service } from '../../enterprise/entities/service';

export type FindAllServicesUseCaseResponse = {
  services: Service[];
};

@Injectable()
export class FindAllServicesUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(): Promise<FindAllServicesUseCaseResponse> {
    const services = await this.servicesRepository.findMany();

    return { services };
  }
}
