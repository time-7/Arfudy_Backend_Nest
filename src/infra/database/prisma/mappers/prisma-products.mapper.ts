import { Product as PrismaProduct } from '@prisma/client';
import { Product } from '@domain/menu/enterprise/entities/products';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

export class PrismaProductsMapper {
  static toDomain(raw: PrismaProduct) {
    return Product.create(
      {
        ...raw,
      },
      UniqueEntityId.createFromRawId(raw.id),
    );
  }
}
