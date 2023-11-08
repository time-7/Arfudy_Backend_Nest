import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { UniqueToken } from '@core/entities/unique-token';
import { Order, Status } from '@domain/restaurant/enterprise/entities/order';
import { Product } from '@domain/restaurant/enterprise/entities/value-objects/products';
import { Prisma, Order as PrismaOrder } from '@prisma/client';

type PrismaOrderProduct = {
  name: string;
  quantity: number;
};

export class PrismaOrderMapper {
  static toPrisma(entity: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      products: entity.products.map((item) => {
        const data: PrismaOrderProduct = {
          name: item.name,
          quantity: item.quantity,
        };

        return data;
      }),
      clientToken: entity.clientToken.toString(),
      status: entity.status,
      serviceId: entity.serviceId.toString(),
    };
  }

  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        serviceId: UniqueEntityId.createFromRawId(raw.serviceId),
        clientToken: UniqueToken.createFromRaw(raw.clientToken),
        products: raw.products.map((item) => Product.create(item)),
        status: raw.status as Status,
      },
      UniqueEntityId.createFromRawId(raw.id),
    );
  }
}
