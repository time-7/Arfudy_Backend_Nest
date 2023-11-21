import {
  OrdersGateway,
  newOrderBody,
} from '@domain/restaurant/application/gateways/orders.gateway';

export class InMemoryOrdersGateway implements OrdersGateway {
  registerNewOrder(data: newOrderBody): void {
    console.log(data);
  }
}
