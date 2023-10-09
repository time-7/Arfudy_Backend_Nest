import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteProductUseCase } from '@domain/menu/application/use-cases/delete-product.use-case';
import { UseCaseResponse } from '@core/responses/use-case.response';

@Controller('products')
export class DeleteProductsController {
  constructor(private deleteProductsUseCase: DeleteProductUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string): Promise<UseCaseResponse> {
    await this.deleteProductsUseCase.execute({ id });

    return { message: 'Produto excluido com sucesso!' };
  }
}
