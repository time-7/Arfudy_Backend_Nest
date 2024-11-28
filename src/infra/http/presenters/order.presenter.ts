import { Order } from '@domain/restaurant/enterprise/entities/order';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { Table } from '@domain/restaurant/enterprise/entities/table';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';
import { Product } from '@domain/restaurant/enterprise/entities/value-objects/products';

class ProductPresenter {
  id: string;
  name: string;
  quantity: number;
  status: string;
  category: string;

  static toHttp(product: Product): ProductPresenter {
    return {
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      status: product.status,
      category: product.category,
    };
  }
}

export class OrderPresenter {
  id: string;
  serviceId: string;
  product: ProductPresenter;
  clientName: string;
  tableNum: number;

  private constructor({
    id,
    serviceId,
    product,
    clientName,
    tableNum,
  }: OrderPresenter) {
    this.id = id;
    this.serviceId = serviceId;
    this.product = product;
    this.clientName = clientName;
    this.tableNum = tableNum;
  }

  static toHttp(order: Order, client: Client, service: Service, table: Table) {
    return order.products.map(
      (product) =>
        new OrderPresenter({
          id: order.id.toString(),
          clientName: client.name,
          product: ProductPresenter.toHttp(product),
          serviceId: service.id.toString(),
          tableNum: table.tableNum,
        }),
    );
  }
}
