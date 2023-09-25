import {
  Product,
  ProductProps,
} from '@domain/menu/enterprise/entities/products';
import { faker } from '@faker-js/faker';
import { NutritionFacts } from '@domain/menu/enterprise/entities/value-objects/nutrition-facts.value-object';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

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
      nutritionFacts:
        override.nutritionFacts ??
        ({
          carbohydrate: 2,
          protein: 2,
          totalFat: 2,
        } as NutritionFacts),
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
      ingredients: override.ingredients ?? [
        {
          name: faker.lorem.word(),
          quantity: faker.number.int() % 10,
          nutritionFacts: {
            carbohydrate: faker.number.int() % 30,
            protein: faker.number.int() % 20,
            totalFat: faker.number.int() % 20,
            totalCalories: null,
          },
        },
        {
          name: faker.lorem.word(),
          quantity: faker.number.int() % 10,
          nutritionFacts: {
            carbohydrate: faker.number.int() % 30,
            protein: faker.number.int() % 20,
            totalFat: faker.number.int() % 20,
            totalCalories: null,
          },
        },
      ],
      nutritionFacts: {} as NutritionFacts,
      price: faker.number.float(),
      unityModelId: faker.lorem.word(),
    },
    id ?? UniqueEntityId.create(),
  );
}
