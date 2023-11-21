import {
  Order,
  OrderProps,
} from '@domain/restaurant/enterprise/entities/order';
import { Product } from '@domain/restaurant/enterprise/entities/value-objects/products';
import { faker } from '@faker-js/faker';
import { UniqueToken } from '@core/entities/unique-token';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

function makeProduct(): Product {
  return Product.create({
    id: faker.number.hex().toString(),
    name: faker.commerce.productName(),
    quantity: faker.number.int() % 10,
  });
}

export function makeOrder(override: Partial<OrderProps> = {}): Order {
  return Order.create({
    products: [makeProduct()],
    clientToken: override.clientToken ?? UniqueToken.create(),
    serviceId: override.serviceId ?? UniqueEntityId.create(),
  });
}
