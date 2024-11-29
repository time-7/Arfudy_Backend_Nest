import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { UniqueToken } from '@core/entities/unique-token';
import { Order } from '@domain/restaurant/enterprise/entities/order';
import {
  Category,
  Product,
  Status,
} from '@domain/restaurant/enterprise/entities/value-objects/products';
import { Prisma, Order as PrismaOrder } from '@prisma/client';

type PrismaOrderProduct = {
  id: string;
  name: string;
  quantity: number;
  status: Status;
  category: Category;
};

export class PrismaOrderMapper {
  static toPrisma(entity: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      products: entity.products.map((item) => {
        const data: PrismaOrderProduct = {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          status: item.status,
          category: item.category,
        };

        return data;
      }),
      clientToken: entity.clientToken.toString(),
      serviceId: entity.serviceId.toString(),
    };
  }

  static toPrismaUpdate(entity: Order): Prisma.OrderUncheckedUpdateInput {
    return {
      products: entity.products.map((item) => {
        const data: PrismaOrderProduct = {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          status: item.status,
          category: item.category,
        };

        return data;
      }),
      clientToken: entity.clientToken.toString(),
      serviceId: entity.serviceId.toString(),
    };
  }

  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        serviceId: UniqueEntityId.createFromRawId(raw.serviceId),
        clientToken: UniqueToken.createFromRaw(raw.clientToken),
        products: raw.products.map((item) =>
          Product.create({
            ...item,
            status: item.status as Status,
            category: item.category as Category,
          }),
        ),
      },
      UniqueEntityId.createFromRawId(raw.id),
    );
  }
}
