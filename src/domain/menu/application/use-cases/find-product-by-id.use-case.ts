import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { Product } from '../../enterprise/entities/products';

interface FindProductByIdUseCaseRequest {
  id: string;
}

interface FindProductByIdUseCaseResponse {
  product: Product;
}

@Injectable()
export class FindProductByIdUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: FindProductByIdUseCaseRequest): Promise<FindProductByIdUseCaseResponse> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new ResourceNotFoundError();

    return { product };
  }
}
