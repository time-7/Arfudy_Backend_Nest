import { Body, Controller, Param, Patch } from '@nestjs/common';
import { EditTableUseCase } from '@domain/restaurant/application/use-cases/edit-table.use-case';
import { EditTableRequestDto } from '../dtos/edit-table.request.dto';
import { HttpResponse } from '@core/responses/http.response';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';

@Controller('tables')
export class EditTableController {
  constructor(private readonly editTableUseCase: EditTableUseCase) {}

  @Patch(':id')
  async handle(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() data: EditTableRequestDto,
  ): Promise<HttpResponse> {
    await this.editTableUseCase.execute({
      id,
      ...data,
    });

    return { message: 'Mesa salva com sucesso!' };
  }
}
