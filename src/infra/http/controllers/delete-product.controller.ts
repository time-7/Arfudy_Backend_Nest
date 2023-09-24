import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ProductPresenter } from '../presenters/product.presenter';
import {
  CreateProductUseCase,
  CreateProductUseCaseRequest,
} from '@domain/menu/application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from '@domain/menu/application/use-cases/delete-product.use-case';

@Controller('products')
export class DeleteProductsController {
  constructor(private deleteProductsUseCase: DeleteProductUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.deleteProductsUseCase.execute({ id });
  }
}
