import { Body, Controller, Post } from '@nestjs/common';
import { StartServiceUseCase } from '@domain/restaurant/application/use-cases/start-service.use-case';
import { StartServiceRequestDto } from '../dtos/start-service.request.dto';

@Controller('services')
export class StartServiceController {
  constructor(private readonly startServiceUseCase: StartServiceUseCase) {}

  @Post()
  async handle(@Body() data: StartServiceRequestDto) {
    const { service } = await this.startServiceUseCase.execute(data);

    return {
      data: {
        clients: service.clients.map((client) => {
          return {
            name: client.name,
            clientToken: client.clientToken,
            isAdmin: client.isAdmin,
          };
        }),
      },
    };
  }
}
