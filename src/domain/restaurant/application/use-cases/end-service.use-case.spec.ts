import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { EndServiceUseCase } from './end-service.use-case';
import { makeService } from '@test/factories/make-service';
import { makeTable } from '@test/factories/make-table';
import { UniqueToken } from '@core/entities/unique-token';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { GivenClientIsNotAdminError } from './errors/client-is-not-admin.error';
import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders.repository';

describe('End Service Use Case', () => {
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let inMemoryTablesRepository: InMemoryTablesRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let sut: EndServiceUseCase;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();
    inMemoryTablesRepository = new InMemoryTablesRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository();

    sut = new EndServiceUseCase(
      inMemoryServicesRepository,
      inMemoryTablesRepository,
      inMemoryOrdersRepository,
    );
  });

  it('should be able to end a service and refresh table active token', async () => {
    const table = makeTable();
    const service = makeService({ tableId: table.id });

    await inMemoryTablesRepository.create(table);
    await inMemoryServicesRepository.create(service);

    await sut.execute({
      serviceId: service.id.toString(),
      clientToken: service.clients[0].clientToken.toString(),
    });

    expect(inMemoryServicesRepository.items[0].hasEnded).toBeTruthy();
    expect(inMemoryTablesRepository.items[0].activeToken).not.toEqual(
      service.tableToken,
    );
  });

  it('should not be able to end a service given token is not from admin', async () => {
    const table = makeTable();
    const service = makeService({ tableId: table.id });

    await inMemoryTablesRepository.create(table);
    await inMemoryServicesRepository.create(service);

    expect(async () => {
      await sut.execute({
        serviceId: service.id.toString(),
        clientToken: UniqueToken.create().toString(),
      });
    }).rejects.toBeInstanceOf(GivenClientIsNotAdminError);
  });

  it('should not be able to end a service that does not exist', async () => {
    expect(async () => {
      await sut.execute({
        serviceId: UniqueEntityId.create().toString(),
        clientToken: UniqueToken.create().toString(),
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
