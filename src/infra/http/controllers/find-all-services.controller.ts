import { Controller, Get } from '@nestjs/common';
import { FindAllServicesUseCase } from '@domain/restaurant/application/use-cases/find-all-services.use-case';
import { ServicePresenter } from '../presenters/services.presenter';

@Controller('services')
export class FindAllServicesController {
  constructor(
    private readonly findAllServicesUseCase: FindAllServicesUseCase,
  ) {}

  @Get()
  async handle() {
    const { services } = await this.findAllServicesUseCase.execute();

    return {
      services: services.map(ServicePresenter.toHttp),
    };
  }
}
