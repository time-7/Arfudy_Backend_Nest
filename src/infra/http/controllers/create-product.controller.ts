import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateProductUseCase } from '@domain/menu/application/use-cases/create-product.use-case';
import { ProductNutritionValidationPipe } from '../pipes/product-nutrition-validation.pipe';
import { CreateProductRequestDto } from '../dtos/create-product.request.dto';
import { CreatedResponse } from '@core/responses/responses/created.response';
import { ProductPresenter } from '../presenters/product.presenter';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class CreateProductsController {
  constructor(private createProductsUseCase: CreateProductUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(new ProductNutritionValidationPipe())
    body: CreateProductRequestDto,
  ): Promise<CreatedResponse<ProductPresenter, 'id'>> {
    const { product } = await this.createProductsUseCase.execute(body);

    return {
      data: { id: product.id.toString() },
      message: 'Produto criado com sucesso!',
    };
  }
}
