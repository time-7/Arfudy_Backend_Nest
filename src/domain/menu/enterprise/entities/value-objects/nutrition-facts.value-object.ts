import { nutritionFacts } from '@prisma/client';
import { Ingredient } from './ingredients.value-object';
import { sumArray } from '@core/helpers/sum-array';
import { Optional } from '@core/types/optional';
export class NutritionFacts implements nutritionFacts {
  carbohydrate: number;

  protein: number;

  totalFat: number;

  totalCalories: number;

  constructor({
    carbohydrate,
    protein,
    totalFat,
    totalCalories,
  }: Optional<NutritionFacts, 'totalCalories'>) {
    this.carbohydrate = carbohydrate;
    this.protein = protein;
    this.totalFat = totalFat;
    this.totalCalories =
      totalCalories ??
      NutritionFacts.calculateTotalCalories({
        carbohydrate,
        protein,
        totalFat,
      });
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

    const ingredientsTotalCalories = ingredients.map((ingredient) => {
      ingredient.nutritionFacts.totalCalories = this.calculateTotalCalories({
        ...ingredient.nutritionFacts,
      });

      return ingredient.nutritionFacts.totalCalories;
    });

    const carbohydrate = sumArray(ingredientsCarbs);
    const protein = sumArray(ingredientsProteins);
    const totalFat = sumArray(ingredientsTotalFats);
    const totalCalories = sumArray(ingredientsTotalCalories);

    return new NutritionFacts({
      carbohydrate,
      protein,
      totalFat,
      totalCalories,
    });
  }

  static create({
    carbohydrate,
    protein,
    totalFat,
  }: Optional<NutritionFacts, 'totalCalories'>) {
    return new NutritionFacts({
      carbohydrate,
      protein,
      totalFat,
      totalCalories: this.calculateTotalCalories({
        carbohydrate,
        protein,
        totalFat,
      }),
    });
  }

  private static calculateTotalCalories({
    carbohydrate,
    protein,
    totalFat,
  }: Optional<NutritionFacts, 'totalCalories'>) {
    return carbohydrate * 4 + protein * 4 + totalFat * 9;
  }
}
