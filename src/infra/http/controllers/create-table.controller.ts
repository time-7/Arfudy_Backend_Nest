import { Body, Controller, Post } from '@nestjs/common';
import { CreateTableUseCase } from '../../../domain/restaurant/application/use-cases/create-table.use-case';
import { CreateTableRequestDto } from '../dtos/create-table.request.dto';

@Controller('tables')
export class CreateTableController {
  constructor(private readonly createTableUseCase: CreateTableUseCase) {}

  @Post()
  async handle(@Body() data: CreateTableRequestDto) {
    const response = await this.createTableUseCase.execute(data);

    return { response };
  }
}
