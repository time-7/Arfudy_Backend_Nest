import { FindAllOrdersUseCase } from '@domain/restaurant/application/use-cases/find-all-orders.use-case';
import { Controller, Get } from '@nestjs/common';
import { OrderPresenter } from '../presenters/order.presenter';

@Controller('orders')
export class FindAllOrdersController {
  constructor(private readonly findAllOrdersUseCase: FindAllOrdersUseCase) {}

  @Get()
  async handle() {
    const { orders } = await this.findAllOrdersUseCase.execute();

    return { data: orders.map(OrderPresenter.toHttp) };
  }
}
