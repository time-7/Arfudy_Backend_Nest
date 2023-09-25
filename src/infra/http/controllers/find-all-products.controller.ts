import { Controller, Get } from '@nestjs/common';
import { FindAllProductsUseCase } from '@domain/menu/application/use-cases/find-all-products.use-case';
import { ProductPresenter } from '../presenters/product.presenter';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class FindAllProductsController {
  constructor(
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: ProductPresenter, isArray: true })
  async handle() {
    const { products } = await this.findAllProductsUseCase.execute();

    return {
      products,
    };
  }
}
