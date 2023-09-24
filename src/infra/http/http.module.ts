import { Module } from '@nestjs/common';
import { FindAllProductsController } from './controllers/find-all-products.controller';
import { FindAllProductsUseCase } from '@domain/menu/application/use-cases/find-all-products.use-case';
import { CreateProductUseCase } from '@domain/menu/application/use-cases/create-product.use-case';
import { CreateProductsController } from './controllers/create-product.controller';
import { DeleteProductUseCase } from '@domain/menu/application/use-cases/delete-product.use-case';
import { DeleteProductsController } from './controllers/delete-product.controller';
import { FindProductByIdUseCase } from '@domain/menu/application/use-cases/find-product-by-id.use-case';
import { FindProductsByIdController } from './controllers/find-product-by-id.controller';

@Module({
  imports: [],
  controllers: [
    FindAllProductsController,
    CreateProductsController,
    DeleteProductsController,
    FindProductsByIdController,
  ],
  providers: [
    FindAllProductsUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    FindProductByIdUseCase,
  ],
})
export class HttpModule {}
