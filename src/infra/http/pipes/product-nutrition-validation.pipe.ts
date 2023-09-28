import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateProductRequestDto } from '../dtos/create-product.request.dto';
import { objectIsEmpty } from '@core/helpers/object-is-empty';

export class ProductNutritionValidationPipe implements PipeTransform {
  messages: string[] = [
    'Produto deve conter ingredientes com tabelas nutricionais ou tabela nutricional própria',
    'Ingredients deve ser um array',
    'NutritionFacts deve ser null ou um objeto com todas as propriedades de tabela nutricional exeto totalCalories',
  ];

  private possuiIngredientesOuTabelaNutritional(body: CreateProductRequestDto) {
    const naoPossuiIngredientes = body.ingredients.length === 0;
    const nutritionFactsEstaVazio =
      !body.nutritionFacts || objectIsEmpty(body.nutritionFacts);

    if (naoPossuiIngredientes && nutritionFactsEstaVazio) {
      return false;
    }

    return true;
  }

  transform(body: CreateProductRequestDto) {
    if (!this.possuiIngredientesOuTabelaNutritional(body)) {
      throw new BadRequestException(this.messages);
    }

    return body;
  }
}
