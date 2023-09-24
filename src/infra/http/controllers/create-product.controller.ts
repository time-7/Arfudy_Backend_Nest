import { Body, Controller, Post } from '@nestjs/common';
import { ProductPresenter } from '../presenters/product.presenter';
import {
  CreateProductUseCase,
  CreateProductUseCaseRequest,
} from '@domain/menu/application/use-cases/create-product.use-case';

@Controller('products')
export class CreateProductsController {
  constructor(private createProductsUseCase: CreateProductUseCase) {}

  @Post()
  async handle(@Body() body: CreateProductUseCaseRequest) {
    const { product } = await this.createProductsUseCase.execute(body);

    return { data: ProductPresenter.toHttp(product) };
  }
}
