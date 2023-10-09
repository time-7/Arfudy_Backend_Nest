import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { Product } from '../../enterprise/entities/products';

export interface FindAllProductsUseCaseResponse {
  products: Product[];
}

@Injectable()
export class FindAllProductsUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(): Promise<FindAllProductsUseCaseResponse> {
    const products = await this.productsRepository.findMany();

    return { products };
  }
}
