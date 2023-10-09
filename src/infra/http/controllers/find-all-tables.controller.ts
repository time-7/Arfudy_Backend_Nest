import { Controller, Get } from '@nestjs/common';
import { FindAllTablesUseCase } from '@domain/restaurant/application/use-cases/find-all-tables.use-case';
import { TablePresenter } from '../presenters/table.preseter';

@Controller('tables')
export class FindAllTablesController {
  constructor(private readonly findAllTablesUseCase: FindAllTablesUseCase) {}

  @Get()
  async handle() {
    const { tables } = await this.findAllTablesUseCase.execute();

    return { data: tables.map(TablePresenter.toHttp) };
  }
}
