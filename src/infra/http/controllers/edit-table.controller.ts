import { Body, Controller, Param, Patch } from '@nestjs/common';
import { EditTableUseCase } from '@domain/restaurant/application/use-cases/edit-table.use-case';
import { EditTableRequestDto } from '../dtos/edit-table.request.dto';

@Controller('tables')
export class EditTableController {
  constructor(private readonly editTableUseCase: EditTableUseCase) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() data: EditTableRequestDto) {
    const respose = await this.editTableUseCase.execute({
      id,
      ...data,
    });

    return { respose };
  }
}
