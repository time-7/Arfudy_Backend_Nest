import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProductsRepository } from '@domain/menu/application/repositories/products.repository';
import { PrismaProductsRepository } from './prisma/repositories/prisma-products.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
  ],
  exports: [PrismaService, ProductsRepository],
})
export class DatabaseModule {}
