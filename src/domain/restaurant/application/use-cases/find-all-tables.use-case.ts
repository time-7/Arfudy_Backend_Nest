import { Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table.repository';
import { Table } from '@domain/restaurant/enterprise/entities/table';

interface FindAllTablesUseCaseResponse {
  tables: Table[];
}

@Injectable()
export class FindAllTablesUseCase {
  constructor(private readonly tablesRepository: TablesRepository) {}

  async execute(): Promise<FindAllTablesUseCaseResponse> {
    const tables = await this.tablesRepository.findMany();

    return { tables };
  }
}
