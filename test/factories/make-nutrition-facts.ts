import { NutritionFacts } from '@domain/menu/enterprise/entities/value-objects/nutrition-facts.value-object';
import { faker } from '@faker-js/faker';

export function makeNutritionFacts(override: Partial<NutritionFacts> = {}) {
  return NutritionFacts.create({
    carbohydrate: override.carbohydrate ?? faker.number.int() % 20,
    protein: override.protein ?? faker.number.int() % 20,
    totalFat: override.totalFat ?? faker.number.int() % 20,
    totalCalories: 0,
  });
}
