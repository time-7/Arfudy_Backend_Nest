import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteProductUseCase } from '@domain/menu/application/use-cases/delete-product.use-case';

@Controller('products')
export class DeleteProductsController {
  constructor(private deleteProductsUseCase: DeleteProductUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.deleteProductsUseCase.execute({ id });
  }
}
