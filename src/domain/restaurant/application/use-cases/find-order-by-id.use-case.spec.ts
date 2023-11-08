import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders.repository';
import { makeOrder } from '@test/factories/make-order';
import { FindOrderByIdUseCase } from './find-order-by-id.use-case';

describe('Find Order By Id', () => {
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let sut: FindOrderByIdUseCase;

  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new FindOrderByIdUseCase(inMemoryOrdersRepository);
  });

  it('should be able to find order by id', async () => {
    const newOrder = makeOrder();
    await inMemoryOrdersRepository.create(newOrder);

    const { order } = await sut.execute({ id: newOrder.id.toString() });

    expect(order).toMatchObject(newOrder);
  });
});
