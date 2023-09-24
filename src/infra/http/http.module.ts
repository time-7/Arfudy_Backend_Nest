import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { FindAllProductsUseCase } from '@domain/menu/application/use-cases/find-all-products.use-case';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [FindAllProductsUseCase],
})
export class HttpModule {}
