import { Controller, Get, Param } from '@nestjs/common';
import { FindProductByIdUseCase } from '@domain/menu/application/use-cases/find-product-by-id.use-case';
import { ProductPresenter } from '../presenters/product.presenter';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';

@Controller('products')
@ApiTags('Products')
export class FindProductsByIdController {
  constructor(
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  @Get(':id')
  @ApiOkResponse({ type: ProductPresenter })
  async handle(@Param('id', MongoIdValidationPipe) id: string) {
    const { product } = await this.findProductByIdUseCase.execute({ id });

    return { data: ProductPresenter.toHttp(product) };
  }
}
