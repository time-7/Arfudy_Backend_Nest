import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { CreateTableUseCase } from './create-table.use-case';
import { makeTable } from '@test/factories/make-table';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

describe('Create Table', () => {
  let inMemoryTablesRepository: InMemoryTablesRepository;
  let sut: CreateTableUseCase;

  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();

    sut = new CreateTableUseCase(inMemoryTablesRepository);
  });

  it('should be able to create a table and have an active token', async () => {
    const table = makeTable({}, UniqueEntityId.createFromInt(1));

    await sut.execute(table);

    expect(inMemoryTablesRepository.items[0].id).toEqual(table.id);
  });
});
