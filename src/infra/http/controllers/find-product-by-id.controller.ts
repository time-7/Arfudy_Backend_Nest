import { Controller, Get, Param } from '@nestjs/common';
import { FindProductByIdUseCase } from '@domain/menu/application/use-cases/find-product-by-id.use-case';
import { ProductPresenter } from '../presenters/product.presenter';

@Controller('products')
export class FindProductsByIdController {
  constructor(
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const { product } = await this.findProductByIdUseCase.execute({ id });

    return { data: ProductPresenter.toHttp(product) };
  }
}
