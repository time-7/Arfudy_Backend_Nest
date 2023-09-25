import { Injectable } from '@nestjs/common';
import { Product } from '../../enterprise/entities/products';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductRequestDto } from '@infra/http/dtos/create-product.request.dto';
import { CreatedResponse } from '@core/responses/responses/created.response';
import { ProductPresenter } from '@infra/http/presenters/product.presenter';

export interface CreateProductUseCaseRequest extends CreateProductRequestDto {}

interface CreateProductUseCaseResponse
  extends CreatedResponse<ProductPresenter, 'id'> {}

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

    return {
      data: { id: product.id.toString() },
      message: 'Produto criado com sucesso!',
    };
  }
}
