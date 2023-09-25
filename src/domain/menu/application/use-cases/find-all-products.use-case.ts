import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { ProductPresenter } from '@infra/http/presenters/product.presenter';

interface FindAllProductsUseCaseResponse {
  products: ProductPresenter[];
}

@Injectable()
export class FindAllProductsUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(): Promise<FindAllProductsUseCaseResponse> {
    const products = await this.productsRepository.findMany();

    return { products: products.map(ProductPresenter.toHttp) };
  }
}
