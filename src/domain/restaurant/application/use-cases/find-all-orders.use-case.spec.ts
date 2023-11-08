import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders.repository';
import { FindAllOrdersUseCase } from './find-all-orders.use-case';
import { makeOrder } from '@test/factories/make-order';

describe('Find All Orders', () => {
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let sut: FindAllOrdersUseCase;

  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new FindAllOrdersUseCase(inMemoryOrdersRepository);
  });

  it('should be able to fetch Orders', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryOrdersRepository.create(makeOrder());
    }

    const { orders } = await sut.execute();

    expect(orders).toHaveLength(10);
  });
});
