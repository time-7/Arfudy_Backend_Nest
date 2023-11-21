import { Order } from '@domain/restaurant/enterprise/entities/order';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { Table } from '@domain/restaurant/enterprise/entities/table';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';

export type newOrderBody = {
  data: {
    order: Order;
    client: Client;
    service: Service;
    table: Table;
  };
};

export abstract class OrdersGateway {
  abstract registerNewOrder(data: newOrderBody): void;
}
