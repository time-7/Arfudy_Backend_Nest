import {
  makeProductWithIngredients,
  makeProductWithoutIngredients,
} from '@test/factories/make-product';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products.repository';
import { EditProductUseCase } from './edit-product.use-case';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { NutritionFacts } from '../../enterprise/entities/value-objects/nutrition-facts.value-object';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

describe('Edit Product', async () => {
  let inMemoryProductsRepository: InMemoryProductsRepository;
  let sut: EditProductUseCase;

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();

    sut = new EditProductUseCase(inMemoryProductsRepository);
  });

  it('should be able to edit a product without ingredients and have nutrition facts', async () => {
    const product = makeProductWithoutIngredients(
      {},
      UniqueEntityId.createFromInt(1),
    );

    await inMemoryProductsRepository.create(product);

    await sut.execute({
      id: product.id.toString(),
      name: 'teste produto 1',
      description: 'teste descrição 1',
      ingredients: [],
    });

    // console.log(inMemoryProductsRepository.items[0]);

    expect(inMemoryProductsRepository.items).toHaveLength(1);
    expect(inMemoryProductsRepository.items[0].nutritionFacts).toMatchObject(
      NutritionFacts.create({ ...product.nutritionFacts }),
    );
    expect(inMemoryProductsRepository.items[0].name).toEqual('teste produto 1');
  });

  it('should be able to edit a product with nutrition facts calculated from ingredients', async () => {
    const product = makeProductWithIngredients(
      {},
      UniqueEntityId.createFromInt(1),
    );

    const ingredients = [
      {
        name: 'teste ingrediente 1',
        quantity: 2.5,
        nutritionFacts: {
          carbohydrate: 10,
          protein: 3.4,
          totalFat: 2,
        } as NutritionFacts,
      },
    ];

    await inMemoryProductsRepository.create(product);

    await sut.execute({
      id: product.id.toString(),
      name: 'teste produto 1',
      description: 'teste descrição 1',
      ingredients,
    });

    expect(inMemoryProductsRepository.items).toHaveLength(1);
    expect(inMemoryProductsRepository.items[0].nutritionFacts).toMatchObject(
      NutritionFacts.createFromIngredients(ingredients),
    );
  });

  it('should not be able to edit a product that does not exist', async () => {
    const product = makeProductWithoutIngredients();

    expect(async () => {
      return await sut.execute({
        id: product.id.toString(),
        name: 'teste produto 1',
        description: 'teste descrição 1',
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
