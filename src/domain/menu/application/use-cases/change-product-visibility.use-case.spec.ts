import { makeProductWithoutIngredients } from 'src/../test/factories/make-product';
import { InMemoryProductsRepository } from 'src/../test/repositories/in-memory-products.repository';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { ChangeProductVisibilityUseCase } from './change-product-visibility.use-case';

describe('Create Product', async () => {
  let inMemoryProductsRepository: InMemoryProductsRepository;
  let sut: ChangeProductVisibilityUseCase;

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();

    sut = new ChangeProductVisibilityUseCase(inMemoryProductsRepository);
  });

  it('should be able to change a products visibility', async () => {
    const product = makeProductWithoutIngredients(
      {},
      UniqueEntityId.createFromInt(1),
    );

    await inMemoryProductsRepository.create(product);

    await sut.execute({ id: product.id.toString() });

    expect(inMemoryProductsRepository.items[0].isVisible).toBeFalsy();
  });
});
