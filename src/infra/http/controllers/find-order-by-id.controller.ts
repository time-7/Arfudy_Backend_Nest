import { FindOrderByIdUseCase } from '@domain/restaurant/application/use-cases/find-order-by-id.use-case';
import { Controller, Get, Param } from '@nestjs/common';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';
import { OrderPresenter } from '../presenters/order.presenter';

@Controller('orders')
export class FindOrderByIdController {
  constructor(private readonly findOrderByIdUseCase: FindOrderByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id', MongoIdValidationPipe) id: string) {
    const { response } = await this.findOrderByIdUseCase.execute({ id });

    return {
      data: OrderPresenter.toHttp(
        response.order,
        response.client,
        response.service,
        response.table,
      ),
    };
  }
}
