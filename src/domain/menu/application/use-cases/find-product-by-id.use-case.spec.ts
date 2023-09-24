import { makeProductWithoutIngredients } from 'src/../test/factories/make-product';
import { InMemoryProductsRepository } from 'src/../test/repositories/in-memory-products.repository';
import { FindProductByIdUseCase } from './find-product-by-id.use-case';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

describe('Find Product By Id', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository;
  let sut: FindProductByIdUseCase;

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();

    sut = new FindProductByIdUseCase(inMemoryProductsRepository);
  });

  it('should be able to find product by id', async () => {
    const id = UniqueEntityId.create();
    await inMemoryProductsRepository.create(
      makeProductWithoutIngredients({}, id),
    );

    const { product } = await sut.execute({ id: id.toString() });

    expect(product.id.toString()).toMatch(id.toString());
  });

  it('should not be able to find product that does not exist', async () => {
    await inMemoryProductsRepository.create(makeProductWithoutIngredients({}));

    expect(async () => {
      return await sut.execute({ id: '1' });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
