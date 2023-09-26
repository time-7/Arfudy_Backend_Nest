import {
  Product,
  ProductProps,
} from '@domain/menu/enterprise/entities/products';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@prisma/client/runtime/library';
import { NutritionFactsPresenter } from './nutrition-facts.presenter';
import { IngredientPresenter } from './ingredient.presenter';

export class ProductPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  has3dModel: boolean;
  @ApiProperty({ type: () => IngredientPresenter, isArray: true })
  ingredients: IngredientPresenter[];
  @ApiProperty({ type: () => NutritionFactsPresenter })
  nutritionFacts: NutritionFactsPresenter;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  unityModelId: string;

  private constructor(
    {
      name,
      description,
      price,
      has3dModel,
      ingredients,
      nutritionFacts,
      imageUrl,
      unityModelId,
    }: Optional<ProductProps>,
    id: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.has3dModel = has3dModel;
    this.ingredients = ingredients;
    this.nutritionFacts = nutritionFacts;
    this.imageUrl = imageUrl;
    this.unityModelId = unityModelId;
  }

  static toHttp(product: Product) {
    return new ProductPresenter(
      {
        name: product.name,
        description: product.description,
        ingredients: product.ingredients.map(IngredientPresenter.toHttp),
        nutritionFacts: NutritionFactsPresenter.toHttp(product.nutritionFacts),
        price: product.price,
        has3dModel: product.has3dModel,
        imageUrl: product.imageUrl,
        unityModelId: product.unityModelId,
      },
      product.id.toString(),
    );
  }
}
