import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateProductRequestDto } from '../dtos/create-product.request.dto';
import { objectIsEmpty } from '@core/helpers/object-is-empty';

export class ProductNutritionValidationPipe implements PipeTransform {
  messages: string[] = [
    'Produto deve conter ingredientes com tabelas nutricionais ou tabela nutricional própria',
    'Ingredients deve ser um array',
    'NutritionFacts deve ser null ou um objeto com todas as propriedades de tabela nutricional exeto totalCalories',
  ];

  private hasIngredientsOrNutritionFacts(body: CreateProductRequestDto) {
    const hasIngredients = body.ingredients.length > 0;
    const nutritionFactsIsEmpty =
      !body.nutritionFacts || objectIsEmpty(body.nutritionFacts);

    if (!hasIngredients && nutritionFactsIsEmpty) {
      return false;
    }

    return true;
  }

  transform(body: CreateProductRequestDto) {
    if (!this.hasIngredientsOrNutritionFacts(body)) {
      throw new BadRequestException(this.messages);
    }

    return body;
  }
}
