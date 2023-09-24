import { nutritionFacts } from '@prisma/client';
import { Ingredient } from './ingredients.value-object';
import { sumArray } from '@core/helpers/sum-array';

export class NutritionFacts implements nutritionFacts {
  carbohydrate: number;

  protein: number;

  totalFat: number;

  totalCalories: number;

  constructor(
    carbs: number,
    protein: number,
    totalFat: number,
    totalCalories?: number,
  ) {
    this.carbohydrate = carbs;
    this.protein = protein;
    this.totalFat = totalFat;
    this.totalCalories = totalCalories;
  }

  static createFromIngredients(ingredients: Ingredient[]) {
    const ingredientsCarbs = ingredients.map((ingredient) => {
      return ingredient.nutritionFacts.carbohydrate;
    });

    const ingredientsProteins = ingredients.map((ingredient) => {
      return ingredient.nutritionFacts.protein;
    });

    const ingredientsTotalFats = ingredients.map((ingredient) => {
      return ingredient.nutritionFacts.totalFat;
    });

    const carbs = sumArray(ingredientsCarbs);
    const protein = sumArray(ingredientsProteins);
    const totalFat = sumArray(ingredientsTotalFats);
    const totalCalories = carbs * 4 + protein * 4 + totalFat * 9;

    return new NutritionFacts(carbs, protein, totalFat, totalCalories);
  }
}
