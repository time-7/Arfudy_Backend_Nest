import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { DeleteTableUseCase } from './delete-table.use-case';
import { makeTable } from '@test/factories/make-table';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

describe('Delete Table', () => {
  let inMemoryTablesRepository: InMemoryTablesRepository;
  let sut: DeleteTableUseCase;

  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new DeleteTableUseCase(inMemoryTablesRepository);
  });

  it('should be able to delete an existing table with no relations', async () => {
    const table = makeTable({}, UniqueEntityId.createFromInt(1));
    inMemoryTablesRepository.create(table);

    await sut.execute({ id: table.id.toString() });
    expect(inMemoryTablesRepository.items).toHaveLength(0);
  });
});
