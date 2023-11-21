import { FindAllOrdersUseCase } from '@domain/restaurant/application/use-cases/find-all-orders.use-case';
import { Controller, Get } from '@nestjs/common';
import { OrderPresenter } from '../presenters/order.presenter';

@Controller('orders')
export class FindAllOrdersController {
  constructor(private readonly findAllOrdersUseCase: FindAllOrdersUseCase) {}

  @Get()
  async handle() {
    const { response } = await this.findAllOrdersUseCase.execute();

    return {
      data: response.map((order) =>
        OrderPresenter.toHttp(
          order.order,
          order.client,
          order.service,
          order.table,
        ),
      ),
    };
  }
}
