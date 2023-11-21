import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { OrderUseCase } from './order.use-case';
import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders.repository';
import { makeService } from '@test/factories/make-service';
import { makeOrder } from '@test/factories/make-order';
import { InMemoryOrdersGateway } from '@test/gateways/in-memory-orders.gateway';
import { InMemoryTablesRepository } from '@test/repositories/in-memory-tables.repository';
import { makeTable } from '@test/factories/make-table';

describe('Make Order', () => {
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryTablesRepository: InMemoryTablesRepository;

  const inMemoryOrdersGateway = new InMemoryOrdersGateway();

  let sut: OrderUseCase;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryTablesRepository = new InMemoryTablesRepository();
    sut = new OrderUseCase(
      inMemoryTablesRepository,
      inMemoryServicesRepository,
      inMemoryOrdersRepository,
      inMemoryOrdersGateway,
    );
  });

  it('should be able to make an order from an ongoin service', async () => {
    const table = makeTable();
    const service = makeService({ tableId: table.id });

    await inMemoryTablesRepository.create(table);
    await inMemoryServicesRepository.create(service);

    const token = service.clients[0].clientToken;

    const order = makeOrder({
      clientToken: token,
      serviceId: service.id,
    });

    await sut.execute({
      products: order.products,
      clientToken: token.toString(),
      serviceId: order.serviceId.toString(),
    });

    expect(inMemoryOrdersRepository.items).toHaveLength(1);
  });
});
