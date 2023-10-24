import { Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table.repository';
import { Table } from '../../enterprise/entities/table';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { CreateTableRequestDto } from '@infra/http/dtos/create-table.request.dto';
import { UniqueToken } from '../../../../core/entities/unique-token';

export interface CreateTableUseCaseRequest extends CreateTableRequestDto {
  id?: UniqueEntityId;
}

interface CreateTableUseCaseResponse {
  table: Table;
}

@Injectable()
export class CreateTableUseCase {
  constructor(private readonly tablesRepository: TablesRepository) {}

  async execute({
    activeToken,
    seatNum,
    tableNum,
    id,
  }: CreateTableUseCaseRequest): Promise<CreateTableUseCaseResponse> {
    const table = Table.create(
      {
        tableNum,
        activeToken: UniqueToken.createFromRaw(activeToken),
        seatNum,
      },
      id,
    );

    await this.tablesRepository.create(table);

    return {
      table,
    };
  }
}
