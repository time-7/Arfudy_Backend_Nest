import { UseCaseResponse } from '@core/responses/use-case.response';
import { Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { EditTableRequestDto } from '@infra/http/dtos/edit-table.request.dto';

export class EditTableuseCaseRequest extends EditTableRequestDto {}

interface EditTableUseCaseResponse extends UseCaseResponse {}

@Injectable()
export class EditTableUseCase {
  constructor(private readonly tableRepository: TablesRepository) {}

  async execute({
    id,
    activeToken,
    tableNum,
    seatNum,
  }: EditTableuseCaseRequest): Promise<EditTableUseCaseResponse> {
    const table = await this.tableRepository.findById(id);
    if (!table) throw new ResourceNotFoundError();

    table.activeToken = activeToken;
    table.tableNum = tableNum;
    table.seatNum = seatNum;

    await this.tableRepository.save(table);
    return { message: 'Mesa salva com sucesso!' };
  }
}
