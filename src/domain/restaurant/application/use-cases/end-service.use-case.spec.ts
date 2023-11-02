import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { EndServiceUseCase } from './end-service.use-case';
import { makeService } from '@test/factories/make-service';
import { makeTable } from '@test/factories/make-table';

describe('End Service Use Case', () => {
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let inMemoryTablesRepository: InMemoryTablesRepository;
  let sut: EndServiceUseCase;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new EndServiceUseCase(
      inMemoryServicesRepository,
      inMemoryTablesRepository,
    );
  });

  it('should be able to end a service and refresh table active token', async () => {
    const table = makeTable();
    const service = makeService({ tableId: table.id });

    await inMemoryTablesRepository.create(table);
    await inMemoryServicesRepository.create(service);
    await sut.execute({
      id: service.id.toString(),
      clientToken: service.clients[0].clientToken.toString(),
    });

    expect(inMemoryServicesRepository.items[0].hasEnded).toBeTruthy();
    expect(inMemoryTablesRepository.items[0].activeToken).not.toEqual(
      service.tableToken,
    );
  });
});
