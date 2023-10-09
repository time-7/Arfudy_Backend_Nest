import { Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

interface DeleteTableUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteTableUseCase {
  constructor(private readonly tableRepository: TablesRepository) {}

  async execute({ id }: DeleteTableUseCaseRequest): Promise<void> {
    const table = await this.tableRepository.findById(id);
    if (!table) throw new ResourceNotFoundError();

    await this.tableRepository.delete(table);
  }
}
