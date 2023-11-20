import { Module } from '@nestjs/common';
import { FindAllProductsController } from './controllers/find-all-products.controller';
import { FindAllProductsUseCase } from '@domain/menu/application/use-cases/find-all-products.use-case';
import { CreateProductUseCase } from '@domain/menu/application/use-cases/create-product.use-case';
import { CreateProductsController } from './controllers/create-product.controller';
import { DeleteProductUseCase } from '@domain/menu/application/use-cases/delete-product.use-case';
import { DeleteProductsController } from './controllers/delete-product.controller';
import { FindProductByIdUseCase } from '@domain/menu/application/use-cases/find-product-by-id.use-case';
import { FindProductsByIdController } from './controllers/find-product-by-id.controller';
import { EditProductController } from './controllers/edit-product.controller';
import { EditProductUseCase } from '@domain/menu/application/use-cases/edit-product.use-case';
import { CreateTableUseCase } from '@domain/restaurant/application/use-cases/create-table.use-case';
import { EditTableUseCase } from '@domain/restaurant/application/use-cases/edit-table.use-case';
import { DeleteTableUseCase } from '@domain/restaurant/application/use-cases/delete-table.use-case';
import { CreateTableController } from './controllers/create-table.controller';
import { EditTableController } from './controllers/edit-table.controller';
import { DeleteTableController } from './controllers/delete-table.controller';
import { FindAllTablesController } from './controllers/find-all-tables.controller';
import { FindTableByIdController } from './controllers/find-table-by-id.controller';
import { FindAllTablesUseCase } from '@domain/restaurant/application/use-cases/find-all-tables.use-case';
import { FindTableByIdUseCase } from '@domain/restaurant/application/use-cases/find-table-by-id.use-case';
import { StartServiceController } from './controllers/start-service.controller';
import { StartServiceUseCase } from '@domain/restaurant/application/use-cases/start-service.use-case';
import { FindAllServicesController } from './controllers/find-all-services.controller';
import { FindAllServicesUseCase } from '@domain/restaurant/application/use-cases/find-all-services.use-case';
import { FindServiceByIdUseCase } from '@domain/restaurant/application/use-cases/find-service-by-id.use-case';
import { FindServiceByIdController } from './controllers/find-service-by-id.controller';
import { JoinServiceController } from './controllers/join-service.controller';
import { JoinServiceUseCase } from '@domain/restaurant/application/use-cases/join-service.use-case';
import { EndServiceController } from './controllers/end-service.controlelr';
import { EndServiceUseCase } from '@domain/restaurant/application/use-cases/end-service.use-case';
import { OrderController } from './controllers/order.controller';
import { OrderUseCase } from '@domain/restaurant/application/use-cases/order.use-case';
import { FindAllOrdersController } from './controllers/find-all-orders.controller';
import { FindAllOrdersUseCase } from '@domain/restaurant/application/use-cases/find-all-orders.use-case';
import { FindOrderByIdController } from './controllers/find-order-by-id.controller';
import { FindOrderByIdUseCase } from '@domain/restaurant/application/use-cases/find-order-by-id.use-case';
import { ChangeOrdersProductStatusController } from './controllers/change-orders-product-status.controller';
import { ChangeOrdersProductStatusUseCase } from '@domain/restaurant/application/use-cases/update-orders-product-status.use-case';

@Module({
  imports: [],
  controllers: [
    FindAllProductsController,
    CreateProductsController,
    DeleteProductsController,
    FindProductsByIdController,
    EditProductController,
    CreateTableController,
    EditTableController,
    DeleteTableController,
    FindAllTablesController,
    FindTableByIdController,
    StartServiceController,
    FindAllServicesController,
    FindServiceByIdController,
    JoinServiceController,
    EndServiceController,
    OrderController,
    FindAllOrdersController,
    FindOrderByIdController,
    ChangeOrdersProductStatusController,
  ],
  providers: [
    FindAllProductsUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    FindProductByIdUseCase,
    EditProductUseCase,
    CreateTableUseCase,
    EditTableUseCase,
    DeleteTableUseCase,
    FindAllTablesUseCase,
    FindTableByIdUseCase,
    StartServiceUseCase,
    FindAllServicesUseCase,
    FindServiceByIdUseCase,
    JoinServiceUseCase,
    EndServiceUseCase,
    OrderUseCase,
    FindAllOrdersUseCase,
    FindOrderByIdUseCase,
    ChangeOrdersProductStatusUseCase,
  ],
})
export class HttpModule {}
