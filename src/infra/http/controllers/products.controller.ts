import { Controller, Get } from '@nestjs/common';
import { FindAllProductsUseCase } from '@domain/menu/application/use-cases/find-all-products.use-case';
import { ProductPresenter } from '../presenters/product.presenter';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
  ) {}

  @Get()
  async handle() {
    const { products } = await this.findAllProductsUseCase.execute();

    return { data: products.map(ProductPresenter.toHttp) };
  }
}
