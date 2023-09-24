import { Injectable } from '@nestjs/common';
import { Product } from '../../enterprise/entities/products';
import { Ingredient } from '../../enterprise/entities/value-objects/ingredients.value-object';
import { NutritionFacts } from '../../enterprise/entities/value-objects/nutrition-facts.value-object';
import { ProductsRepository } from '../repositories/products.repository';

export interface CreateProductUseCaseRequest {
  name: string;
  description: string;
  ingredients: Ingredient[];
  nutritionFacts?: NutritionFacts;
  has3dModel: boolean;
  imageUrl: string;
  price: number;
  unityModelId: string;
}

interface CreateProductUseCaseResponse {
  product: Product;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    description,
    ingredients,
    name,
    nutritionFacts,
    has3dModel,
    imageUrl,
    price,
    unityModelId,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    let product: Product = Product.create({
      name,
      description,
      nutritionFacts,
      ingredients,
      has3dModel,
      imageUrl,
      price,
      unityModelId,
    });

    product = await this.productsRepository.create(product);

    return { product };
  }
}
