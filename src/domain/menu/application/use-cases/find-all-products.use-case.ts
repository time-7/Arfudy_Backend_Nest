import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { Product } from '@domain/menu/enterprise/entities/products';

interface FindAllProductsUseCaseResponse {
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
