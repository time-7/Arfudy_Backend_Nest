import { Controller, Get } from '@nestjs/common';
import { FindAllServicesUseCase } from '@domain/restaurant/application/use-cases/find-all-services.use-case';
import { ServicePresenter } from '../presenters/services.presenter';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('services')
@ApiTags('Services')
export class FindAllServicesController {
  constructor(
    private readonly findAllServicesUseCase: FindAllServicesUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: () => ServicePresenter, isArray: true })
  async handle() {
    const { services } = await this.findAllServicesUseCase.execute();

    return {
      services: services.map(ServicePresenter.toHttp),
    };
  }
}
