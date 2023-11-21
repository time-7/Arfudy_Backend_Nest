import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders.repository';
import { makeOrder } from '@test/factories/make-order';
import { FindOrderByIdUseCase } from './find-order-by-id.use-case';
import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { makeService } from '@test/factories/make-service';
import { makeTable } from '@test/factories/make-table';

describe('Find Order By Id', () => {
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let inMemoryTablesRepository: InMemoryTablesRepository;

  let sut: FindOrderByIdUseCase;

  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryServicesRepository = new InMemoryServicesRepository();
    inMemoryTablesRepository = new InMemoryTablesRepository();

    sut = new FindOrderByIdUseCase(
      inMemoryOrdersRepository,
      inMemoryServicesRepository,
      inMemoryTablesRepository,
    );
  });

  it('should be able to find order by id', async () => {
    const table = makeTable();
    const service = makeService({
      tableId: table.id,
      tableToken: table.activeToken,
    });

    const newOrder = makeOrder({ serviceId: service.id });

    await inMemoryTablesRepository.create(table);
    await inMemoryServicesRepository.create(service);
    await inMemoryOrdersRepository.create(newOrder);

    const { response } = await sut.execute({ id: newOrder.id.toString() });

    expect(response.order).toMatchObject(newOrder);
  });
});
