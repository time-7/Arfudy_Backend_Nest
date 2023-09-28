import { Ingredient } from '@domain/menu/enterprise/entities/value-objects/ingredients.value-object';
import { faker } from '@faker-js/faker';
import { makeNutritionFacts } from './make-nutrition-facts';

export function makeIngredient(override: Partial<Ingredient> = {}): Ingredient {
  return {
    name: override.name ?? faker.lorem.word(),
    quantity: override.quantity ?? faker.number.int() % 5,
    nutritionFacts: makeNutritionFacts(override.nutritionFacts),
  };
}
