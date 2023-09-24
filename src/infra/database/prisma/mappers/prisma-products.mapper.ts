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
  static toPrisma(product: Product) {
    return {
      name: product.name,
      description: product.description,
      has3dModel: product.has3dModel,
      unityModelId: product.unityModelId,
      imageUrl: '',
      price: product.price,
      ingredients: product.ingredients,
      nutritionFacts: product.nutritionFacts,
      id: product.id.toString(),
    };
  }
}
