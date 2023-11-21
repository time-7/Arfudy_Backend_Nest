import {
  ChangeOrdersProductStatusUseCase,
  ChangeOrdersProductStatusUseCaseRequest,
} from '@domain/restaurant/application/use-cases/update-orders-product-status.use-case';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';

@Controller('orders/:id')
export class ChangeOrdersProductStatusController {
  constructor(
    private readonly changeOrdersProductStatusUseCase: ChangeOrdersProductStatusUseCase,
  ) {}

  @Post()
  async handle(
    @Param('id', MongoIdValidationPipe) orderId: string,
    @Body() data: ChangeOrdersProductStatusUseCaseRequest,
  ) {
    try {
      await this.changeOrdersProductStatusUseCase.execute({
        orderId,
        ...data,
      });
      return { message: 'Pedido atualizado com sucesso!' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
