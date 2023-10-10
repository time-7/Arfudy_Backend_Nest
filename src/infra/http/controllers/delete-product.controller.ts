import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteProductUseCase } from '@domain/menu/application/use-cases/delete-product.use-case';
import { HttpResponse } from '@core/responses/http.response';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';

@Controller('products')
export class DeleteProductsController {
  constructor(private deleteProductsUseCase: DeleteProductUseCase) {}

  @Delete(':id')
  async handle(
    @Param('id', MongoIdValidationPipe) id: string,
  ): Promise<HttpResponse> {
    await this.deleteProductsUseCase.execute({ id });

    return { message: 'Produto excluido com sucesso!' };
  }
}
