import { FindAllOrdersByTableIdUseCase } from '@domain/restaurant/application/use-cases/find-all-orders-by-table-id.use-case';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';
import { OrderPresenter } from '../presenters/order.presenter';

@Controller('orders/table/:id')
export class FindAllOrdersByTableIdController {
  constructor(
    private readonly findAllOrdersByTableIdUseCase: FindAllOrdersByTableIdUseCase,
  ) {}

  @Get()
  async handle(@Param('id', MongoIdValidationPipe) tableId: string) {
    try {
      const { response } = await this.findAllOrdersByTableIdUseCase.execute({
        tableId,
      });

      return {
        data: response.map((item) =>
          OrderPresenter.toHttp(
            item.order,
            item.client,
            item.service,
            item.table,
          ),
        ),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
