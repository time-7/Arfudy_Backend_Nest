import {
  BadRequestException,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';
import { EndServiceUseCase } from '@domain/restaurant/application/use-cases/end-service.use-case';

@Controller('services')
export class EndServiceController {
  constructor(private readonly endServiceUseCase: EndServiceUseCase) {}

  @Post('end/:id')
  @HttpCode(HttpStatus.OK)
  async handle(
    @Headers('clientToken') clientToken: string,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    try {
      await this.endServiceUseCase.execute({ clientToken, serviceId: id });

      return { message: 'Atendimento finalizado com sucesso' };
    } catch (err) {
      throw new BadRequestException('Erro ao finalizar atendimento');
    }
  }
}
