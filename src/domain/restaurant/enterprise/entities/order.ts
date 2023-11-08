import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { UniqueToken } from '@core/entities/unique-token';
import { Product } from './value-objects/products';

export enum Status {
  PENDING = 'PENDING',
  INPREPARE = 'INPREPARE',
  DONE = 'DONE',
}

export type OrderProps = {
  serviceId: UniqueEntityId;
  products: Product[];
  clientToken: UniqueToken;
  status?: Status;
};

export class Order extends Entity<OrderProps> {
  get serviceId(): UniqueEntityId {
    return this.props.serviceId;
  }

  get clientToken(): UniqueToken {
    return this.props.clientToken;
  }

  get products(): Product[] {
    return this.props.products;
  }

  get status(): Status {
    return this.props.status;
  }

  static create(
    { products, serviceId, clientToken, status }: OrderProps,
    id?: UniqueEntityId,
  ) {
    return new Order(
      {
        products,
        serviceId,
        clientToken,
        status: status ?? Status.PENDING,
      },
      id,
    );
  }
}
