import { makeProductWithoutIngredients } from 'src/../test/factories/make-product';
import { InMemoryProductsRepository } from 'src/../test/repositories/in-memory-products.repository';
import { FindAllProductsUseCase } from './find-all-products.use-case';

describe('Find All Products', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository;
  let sut: FindAllProductsUseCase;

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    sut = new FindAllProductsUseCase(inMemoryProductsRepository);
  });

  it('should be able to fetch products', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryProductsRepository.create(makeProductWithoutIngredients());
    }

    const { products } = await sut.execute();

    expect(products).toHaveLength(10);
  });
});
