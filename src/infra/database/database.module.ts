import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProductsRepository } from '@domain/menu/application/repositories/products.repository';
import { PrismaProductsRepository } from './prisma/repositories/prisma-products.repository';
import { TablesRepository } from '../../domain/restaurant/application/repositories/table.repository';
import { PrismaTablesRepository } from './prisma/repositories/prisma-tables.repository';
import { ServicesRepository } from '../../domain/restaurant/application/repositories/services.repository';
import { PrismaServicesRepository } from './prisma/repositories/prisma-services.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
    {
      provide: TablesRepository,
      useClass: PrismaTablesRepository,
    },
    {
      provide: ServicesRepository,
      useClass: PrismaServicesRepository,
    },
  ],
  exports: [
    PrismaService,
    ProductsRepository,
    TablesRepository,
    ServicesRepository,
  ],
})
export class DatabaseModule {}
