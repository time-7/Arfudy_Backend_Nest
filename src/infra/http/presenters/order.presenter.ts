import { Order, Status } from '@domain/restaurant/enterprise/entities/order';
import { Product } from '@domain/restaurant/enterprise/entities/value-objects/products';

class ProductPresenter {
  name: string;
  quantity: number;

  static toHttp(product: Product): ProductPresenter {
    return {
      name: product.name,
      quantity: product.quantity,
    };
  }
}

function statusPresenter(status: Status): string {
  let response: string;

  if (status === 'PENDING') response = 'Pending';
  else if (status === 'INPREPARE') response = 'In Prepare';
  else response = 'DONE';

  return response;
}

export class OrderPresenter {
  id: string;
  serviceId: string;
  products: ProductPresenter[];
  clientToken: string;
  status?: string;

  private constructor({
    id,
    serviceId,
    products,
    clientToken,
    status,
  }: OrderPresenter) {
    this.id = id;
    this.serviceId = serviceId;
    this.products = products;
    this.clientToken = clientToken;
    this.status = status;
  }

  static toHttp({ clientToken, id, products, serviceId, status }: Order) {
    return new OrderPresenter({
      id: id.toString(),
      clientToken: clientToken.toString(),
      products: products.map(ProductPresenter.toHttp),
      serviceId: serviceId.toString(),
      status: statusPresenter(status),
    });
  }
}
