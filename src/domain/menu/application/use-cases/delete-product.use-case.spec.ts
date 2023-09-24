import {
  makeProductWithIngredients,
  makeProductWithoutIngredients,
} from 'src/../test/factories/make-product';
import { InMemoryProductsRepository } from 'src/../test/repositories/in-memory-products.repository';
import { DeleteProductUseCase } from './delete-product.use-case';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id';

describe('Delete Product', async () => {
  let inMemoryProductsRepository: InMemoryProductsRepository;
  let sut: DeleteProductUseCase;

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();

    sut = new DeleteProductUseCase(inMemoryProductsRepository);
  });

  it('should be able to delete a product', async () => {
    const product = makeProductWithoutIngredients(
      {},
      UniqueEntityId.createFromInt(1),
    );

    await inMemoryProductsRepository.create(product);

    await sut.execute({ id: product.id.toString() });

    expect(inMemoryProductsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a product that does not exist', async () => {
    const product = makeProductWithIngredients({});

    await inMemoryProductsRepository.create(product);

    expect(async () => {
      await sut.execute({ id: '1' });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
