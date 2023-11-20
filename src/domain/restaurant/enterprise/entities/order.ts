import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { UniqueToken } from '@core/entities/unique-token';
import { Product } from './value-objects/products';

export type OrderProps = {
  serviceId?: UniqueEntityId;
  products: Product[];
  clientToken?: UniqueToken;
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

  static create(
    { products, serviceId, clientToken }: OrderProps,
    id?: UniqueEntityId,
  ) {
    return new Order(
      {
        products,
        serviceId: serviceId,
        clientToken: clientToken,
      },
      id,
    );
  }
}
