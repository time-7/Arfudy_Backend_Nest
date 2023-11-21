import { Global, Module } from '@nestjs/common';
import { WsServicesGateway } from './gateways/ws-services.gateway';
import { WsOrdersGateway } from './gateways/ws-orders.gateway';
import { OrdersGateway } from '@domain/restaurant/application/gateways/orders.gateway';
import { ServicesGateway } from '@domain/restaurant/application/gateways/services.gateway';

@Global()
@Module({
  providers: [
    { provide: ServicesGateway, useClass: WsServicesGateway },
    { provide: OrdersGateway, useClass: WsOrdersGateway },
  ],
  exports: [OrdersGateway, ServicesGateway],
})
export class WsModule {}
