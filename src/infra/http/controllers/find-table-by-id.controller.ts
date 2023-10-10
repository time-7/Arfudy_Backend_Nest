import { Controller, Get, Param } from '@nestjs/common';
import { TablePresenter } from '../presenters/table.preseter';
import { FindTableByIdUseCase } from '@domain/restaurant/application/use-cases/find-table-by-id.use-case';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';

@Controller('tables')
export class FindTableByIdController {
  constructor(private readonly findTableByIdUseCase: FindTableByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id', MongoIdValidationPipe) id: string) {
    const { table } = await this.findTableByIdUseCase.execute({ id });

    return { data: TablePresenter.toHttp(table) };
  }
}
