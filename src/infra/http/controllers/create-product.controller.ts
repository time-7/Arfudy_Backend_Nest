import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateProductUseCase } from '@domain/menu/application/use-cases/create-product.use-case';
import { ProductNutritionValidationPipe } from '../pipes/product-nutrition-validation.pipe';
import { CreateProductRequestDto } from '../dtos/create-product.request.dto';

@Controller('products')
export class CreateProductsController {
  constructor(private createProductsUseCase: CreateProductUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(new ProductNutritionValidationPipe())
    body: CreateProductRequestDto,
  ) {
    const { data, message } = await this.createProductsUseCase.execute(body);

    return { data, message };
  }
}
