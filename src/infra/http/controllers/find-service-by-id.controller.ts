import { Controller, Get, Param } from '@nestjs/common';
import { FindServiceByIdUseCase } from '@domain/restaurant/application/use-cases/find-service-by-id.use-case';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';
import { ServicePresenter } from '../presenters/services.presenter';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('services')
@ApiTags('Services')
export class FindServiceByIdController {
  constructor(
    private readonly findServiceByIdUseCase: FindServiceByIdUseCase,
  ) {}

  @Get(':id')
  @ApiOkResponse({ type: () => ServicePresenter })
  async handle(@Param('id', MongoIdValidationPipe) id: string) {
    const { service } = await this.findServiceByIdUseCase.execute({ id });

    return {
      data: ServicePresenter.toHttp(service),
    };
  }
}
