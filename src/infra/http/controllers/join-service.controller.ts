import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Param, Body } from '@nestjs/common';
import {
  JoinServiceUseCase,
  JoinServiceUseCaseRequest,
} from '@domain/restaurant/application/use-cases/join-service.use-case';
import { ServicePresenter } from '../presenters/services.presenter';

@Controller('services')
@ApiTags('Services')
export class JoinServiceController {
  constructor(private readonly joinServiceUseCase: JoinServiceUseCase) {}

  @Post(':tableToken')
  @ApiOkResponse({ type: () => ServicePresenter })
  async handle(
    @Param('tableToken') tableToken: string,
    @Body() data: JoinServiceUseCaseRequest,
  ) {
    const { clientToken } = await this.joinServiceUseCase.execute({
      tableToken,
      ...data,
    });

    return { data: { clientToken } };
  }
}
