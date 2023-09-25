import {
  EditProductUseCase,
  EditProductUseCaseRequest,
} from '@domain/menu/application/use-cases/edit-product.use-case';
import { Controller, Param, Body, Patch } from '@nestjs/common';

@Controller('products')
export class EditProductController {
  constructor(private readonly updateProductUseCase: EditProductUseCase) {}

  @Patch(':id')
  async handle(
    @Param('id') id: string,
    @Body() data: EditProductUseCaseRequest,
  ) {
    const { message } = await this.updateProductUseCase.execute({
      id,
      ...data,
    });

    return { message };
  }
}
