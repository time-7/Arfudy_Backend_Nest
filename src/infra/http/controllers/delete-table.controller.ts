import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteTableUseCase } from '@domain/restaurant/application/use-cases/delete-table.use-case';
import { HttpResponse } from '@core/responses/http.response';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeletedResponse } from '@core/responses/responses/deleted.response';

@Controller('tables')
@ApiTags('Tables')
export class DeleteTableController {
  constructor(private readonly deleteTableUseCase: DeleteTableUseCase) {}

  @Delete(':id')
  @ApiOkResponse({ type: () => DeletedResponse })
  async handle(
    @Param('id', MongoIdValidationPipe) id: string,
  ): Promise<HttpResponse> {
    await this.deleteTableUseCase.execute({ id });

    return { message: 'Mesa excluida com sucesso!' };
  }
}
