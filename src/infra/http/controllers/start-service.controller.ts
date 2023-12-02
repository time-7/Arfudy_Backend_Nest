import { Body, Controller, Post } from '@nestjs/common';
import { StartServiceUseCase } from '@domain/restaurant/application/use-cases/start-service.use-case';
import { StartServiceRequestDto } from '../dtos/start-service.request.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ServicePresenter } from '../presenters/services.presenter';

@Controller('services')
@ApiTags('Services')
export class StartServiceController {
  constructor(private readonly startServiceUseCase: StartServiceUseCase) {}

  @Post()
  @ApiOkResponse({ type: () => ServicePresenter })
  async handle(@Body() data: StartServiceRequestDto) {
    const { service } = await this.startServiceUseCase.execute(data);

    return {
      data: {
        id: service.id.toString(),
        token: service.serviceToken.toString(),
        clients: service.clients.map((client) => {
          return {
            name: client.name,
            clientToken: client.clientToken.toString(),
            isAdmin: client.isAdmin,
          };
        }),
      },
    };
  }
}
