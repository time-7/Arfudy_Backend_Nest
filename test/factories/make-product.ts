import {
  Product,
  ProductProps,
} from '@domain/menu/enterprise/entities/products';
import { faker } from '@faker-js/faker';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { makeIngredient } from './make-ingredient';
import { makeNutritionFacts } from './make-nutrition-facts';

export function makeProductWithoutIngredients(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityId,
): Product {
  return Product.create(
    {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      has3dModel: false,
      imageUrl: faker.lorem.words(),
      ingredients: [],
      nutritionFacts: makeNutritionFacts(override.nutritionFacts),
      price: faker.number.float(),
      unityModelId: faker.lorem.word(),
    },
    id ?? UniqueEntityId.create(),
  );
}

export function makeProductWithIngredients(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityId,
): Product {
  return Product.create(
    {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      has3dModel: false,
      imageUrl: faker.lorem.words(),
      ingredients: override.ingredients ?? [makeIngredient()],
      nutritionFacts: null,
      price: faker.number.float(),
      unityModelId: faker.lorem.word(),
    },
    id ?? UniqueEntityId.create(),
  );
}
