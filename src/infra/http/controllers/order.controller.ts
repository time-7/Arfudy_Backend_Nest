import { OrderUseCase } from '@domain/restaurant/application/use-cases/order.use-case';
import {
  Body,
  Controller,
  Post,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { OrderRequestDto } from '../dtos/order.request.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  @Post()
  async handle(
    @Headers('clientToken') clientToken: string,
    @Body() data: OrderRequestDto,
  ) {
    try {
      await this.orderUseCase.execute({ clientToken, ...data });

      return {
        message: 'Pedido realizado com sucesso!',
      };
    } catch (err) {
      throw new BadRequestException(
        'Não foi possível realizar seu pedido, tente novamente mais tarde.',
      );
    }
  }
}
