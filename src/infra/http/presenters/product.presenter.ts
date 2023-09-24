import { Product } from '@domain/menu/enterprise/entities/products';
import { ApiProperty } from '@nestjs/swagger';

export class ProductPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  private constructor() {}

  static toHttp(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      ingredients: product.ingredients,
      nutritionFacts: product.nutritionFacts,
      price: product.price,
      has3dModel: product.has3dModel,
      imageUrl: product.imageUrl,
      unityModelId: product.unityModelId,
    };
  }
}
