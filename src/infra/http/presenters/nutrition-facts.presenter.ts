import { ApiProperty } from '@nestjs/swagger';
import { NutritionFacts } from '@domain/menu/enterprise/entities/value-objects/nutrition-facts.value-object';

export class NutritionFactsPresenter {
  @ApiProperty()
  carbohydrate: number;

  @ApiProperty()
  protein: number;

  @ApiProperty()
  totalFat: number;

  @ApiProperty()
  totalCalories: number;

  constructor({
    carbohydrate,
    protein,
    totalFat,
    totalCalories,
  }: NutritionFacts) {
    this.carbohydrate = carbohydrate;
    this.protein = protein;
    this.totalFat = totalFat;
    this.totalCalories = totalCalories;
  }

  static toHttp(nutritionFacts: NutritionFacts) {
    return new NutritionFactsPresenter({ ...nutritionFacts });
  }
}
