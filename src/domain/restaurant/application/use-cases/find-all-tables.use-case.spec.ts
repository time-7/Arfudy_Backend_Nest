import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { FindAllTablesUseCase } from './find-all-tables.use-case';
import { makeTable } from '@test/factories/make-table';

describe('Find All Tables', () => {
  let inMemoryTablesRepository: InMemoryTablesRepository;
  let sut: FindAllTablesUseCase;

  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new FindAllTablesUseCase(inMemoryTablesRepository);
  });

  it('should be able to fetch Tables', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryTablesRepository.create(makeTable());
    }

    const { tables } = await sut.execute();

    expect(tables).toHaveLength(10);
  });
});
