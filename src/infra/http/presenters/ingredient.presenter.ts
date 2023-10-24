import { Ingredient } from '@domain/menu/enterprise/entities/value-objects/ingredients.value-object';
import { NutritionFactsPresenter } from './nutrition-facts.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class IngredientPresenter {
  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: () => NutritionFactsPresenter })
  nutritionFacts: NutritionFactsPresenter;

  private constructor({ name, quantity, nutritionFacts }: IngredientPresenter) {
    this.name = name;
    this.quantity = quantity;
    this.nutritionFacts = nutritionFacts;
  }

  static toHttp({ name, quantity, nutritionFacts }: Ingredient) {
    return new IngredientPresenter({
      name,
      quantity,
      nutritionFacts: NutritionFactsPresenter.toHttp(nutritionFacts),
    });
  }
}
