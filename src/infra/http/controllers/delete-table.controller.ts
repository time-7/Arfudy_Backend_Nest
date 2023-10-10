import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteTableUseCase } from '@domain/restaurant/application/use-cases/delete-table.use-case';
import { HttpResponse } from '@core/responses/http.response';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';

@Controller('tables')
export class DeleteTableController {
  constructor(private readonly deleteTableUseCase: DeleteTableUseCase) {}

  @Delete(':id')
  async handle(
    @Param('id', MongoIdValidationPipe) id: string,
  ): Promise<HttpResponse> {
    await this.deleteTableUseCase.execute({ id });

    return { message: 'Mesa excluida com sucesso!' };
  }
}
