import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { makeTable } from '@test/factories/make-table';
import { FindTableByIdUseCase } from './find-table-by-id.use-case';

describe('Find Table By Id', () => {
  let inMemoryTablesRepository: InMemoryTablesRepository;
  let sut: FindTableByIdUseCase;

  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new FindTableByIdUseCase(inMemoryTablesRepository);
  });

  it('should be able to find table by id', async () => {
    const newTable = makeTable();
    await inMemoryTablesRepository.create(newTable);

    const { table } = await sut.execute({ id: newTable.id.toString() });

    expect(table).toMatchObject(newTable);
  });
});
