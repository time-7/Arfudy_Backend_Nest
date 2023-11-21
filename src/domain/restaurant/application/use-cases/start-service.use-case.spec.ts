import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { StartServiceUseCase } from './start-service.use-case';
import { makeService } from '@test/factories/make-service';
import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { makeTable } from '@test/factories/make-table';
import { InMemoryServicesGateway } from '@test/gateways/in-memory-services.gateway';

describe('Create Service', () => {
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let inMemoryTablesRepository: InMemoryTablesRepository;
  const inMemoryServicesGateway = new InMemoryServicesGateway();

  let sut: StartServiceUseCase;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();
    inMemoryTablesRepository = new InMemoryTablesRepository();

    sut = new StartServiceUseCase(
      inMemoryServicesRepository,
      inMemoryTablesRepository,
      inMemoryServicesGateway,
    );
  });

  it('should be able to create a service and have an active token', async () => {
    const table = makeTable();

    const service = makeService({
      tableId: table.id,
      tableToken: table.activeToken,
    });

    await inMemoryTablesRepository.create(table);

    await sut.execute({
      tableId: service.tableId.toString(),
      tableToken: service.tableToken.toString(),
      serviceToken: service.serviceToken.toString(),
      hasEnded: service.hasEnded,
      client: service.clients[0],
    });

    expect(inMemoryServicesRepository.items).toHaveLength(1);
  });
});
