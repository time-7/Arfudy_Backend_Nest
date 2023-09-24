import {
  makeProductWithIngredients,
  makeProductWithoutIngredients,
} from 'src/../test/factories/make-product';
import { InMemoryProductsRepository } from 'src/../test/repositories/in-memory-products.repository';
import { CreateProductUseCase } from './create-product.use-case';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

describe('Create Product', async () => {
  let inMemoryProductsRepository: InMemoryProductsRepository;
  let sut: CreateProductUseCase;

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();

    sut = new CreateProductUseCase(inMemoryProductsRepository);
  });

  it('should be able to create a product without ingredients and have nutrition facts', async () => {
    const product = makeProductWithoutIngredients(
      {},
      UniqueEntityId.createFromInt(1),
    );

    await sut.execute(product);

    expect(inMemoryProductsRepository.items).toHaveLength(1);
    expect(inMemoryProductsRepository.items[0].nutritionFacts).toBeTruthy();
  });

  it('should be able to create a product with nutrition facts calculated from ingredients', async () => {
    const product = makeProductWithIngredients(
      {},
      UniqueEntityId.createFromInt(1),
    );

    await sut.execute(product);

    expect(inMemoryProductsRepository.items).toHaveLength(1);
    expect(inMemoryProductsRepository.items[0].nutritionFacts).toBeTruthy();
  });
});
