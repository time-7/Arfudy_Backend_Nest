import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders.repository';
import { FindAllOrdersUseCase } from './find-all-orders.use-case';
import { makeOrder } from '@test/factories/make-order';
import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { makeTable } from '@test/factories/make-table';
import { makeService } from '@test/factories/make-service';

describe('Find All Orders', () => {
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let inMemoryTablesRepository: InMemoryTablesRepository;
  let sut: FindAllOrdersUseCase;

  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryServicesRepository = new InMemoryServicesRepository();
    inMemoryTablesRepository = new InMemoryTablesRepository();

    sut = new FindAllOrdersUseCase(
      inMemoryOrdersRepository,
      inMemoryServicesRepository,
      inMemoryTablesRepository,
    );
  });

  it('should be able to fetch Orders', async () => {
    const table = makeTable();
    const service = makeService({
      tableId: table.id,
      tableToken: table.activeToken,
    });

    await inMemoryTablesRepository.create(table);
    await inMemoryServicesRepository.create(service);

    for (let i = 0; i < 10; i++) {
      await inMemoryOrdersRepository.create(
        makeOrder({ serviceId: service.id }),
      );
    }

    const { response } = await sut.execute();

    expect(response).toHaveLength(10);
  });
});
