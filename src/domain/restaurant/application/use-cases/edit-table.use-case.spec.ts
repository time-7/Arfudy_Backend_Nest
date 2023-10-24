import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { EditTableUseCase } from './edit-table.use-case';
import { makeTable } from '@test/factories/make-table';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { UniqueToken } from '@core/entities/unique-token';

describe('Edit Table', () => {
  let inMemoryTablesRepository: InMemoryTablesRepository;
  let sut: EditTableUseCase;

  beforeEach(() => {
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new EditTableUseCase(inMemoryTablesRepository);
  });

  it('should be able to edit an existing table', async () => {
    const id = UniqueEntityId.createFromInt(1);
    const table = makeTable({}, id);

    await inMemoryTablesRepository.create(table);

    const newToken = UniqueToken.create();

    await sut.execute({
      id: id.toString(),
      activeToken: newToken.toString(),
    });
    expect(inMemoryTablesRepository.items[0].activeToken).toEqual(newToken);
  });

  it('should not be able to edit a non existing table', async () => {
    const table = makeTable();

    await inMemoryTablesRepository.create(table);

    expect(async () => {
      return await sut.execute({
        id: UniqueEntityId.createFromInt(1).toString(),
        activeToken: UniqueToken.create().toString(),
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
