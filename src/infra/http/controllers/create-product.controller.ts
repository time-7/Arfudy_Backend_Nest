import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  CreateProductUseCase,
  CreateProductUseCaseRequest,
} from '@domain/menu/application/use-cases/create-product.use-case';

@Controller('products')
export class CreateProductsController {
  constructor(private createProductsUseCase: CreateProductUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateProductUseCaseRequest) {
    const { data, message } = await this.createProductsUseCase.execute(body);

    return { data, message };
  }
}
