import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateTableUseCase } from '@domain/restaurant/application/use-cases/create-table.use-case';
import { CreateTableRequestDto } from '../dtos/create-table.request.dto';
import { CreatedResponse } from '@core/responses/responses/created.response';
import { TablePresenter } from '../presenters/table.preseter';

@Controller('tables')
export class CreateTableController {
  constructor(private readonly createTableUseCase: CreateTableUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() data: CreateTableRequestDto,
  ): Promise<CreatedResponse<TablePresenter, 'id' | 'activeToken'>> {
    const { table } = await this.createTableUseCase.execute(data);

    return {
      data: {
        id: table.id.toString(),
        activeToken: table.activeToken,
      },
      message: 'Mesa criada com sucesso!',
    };
  }
}
