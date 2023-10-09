import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteTableUseCase } from '@domain/restaurant/application/use-cases/delete-table.use-case';
import { UseCaseResponse } from '@core/responses/use-case.response';

@Controller('tables')
export class DeleteTableController {
  constructor(private readonly deleteTableUseCase: DeleteTableUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string): Promise<UseCaseResponse> {
    await this.deleteTableUseCase.execute({ id });

    return { message: 'Mesa excluida com sucesso!' };
  }
}
