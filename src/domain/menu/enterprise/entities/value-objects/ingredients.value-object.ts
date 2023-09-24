import { ingredient } from '@prisma/client';
import { NutritionFacts } from './nutrition-facts.value-object';

export class Ingredient implements ingredient {
  name: string;

  quantity: number;

  nutritionFacts: NutritionFacts;
}
