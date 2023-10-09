import { Table } from '@domain/restaurant/enterprise/entities/table';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { TablesRepository } from '../repositories/table.repository';

export interface FindTableByIdUseCaseRequest {
  id: string;
}

export interface FindTableByIdUseCaseResponse {
  table: Table;
}

@Injectable()
export class FindTableByIdUseCase {
  constructor(private readonly tablesRepository: TablesRepository) {}

  async execute({
    id,
  }: FindTableByIdUseCaseRequest): Promise<FindTableByIdUseCaseResponse> {
    const table = await this.tablesRepository.findById(id);
    if (!table) throw new ResourceNotFoundError();

    return { table };
  }
}
