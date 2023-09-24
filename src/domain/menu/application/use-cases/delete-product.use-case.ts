import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { ProductsRepository } from '../repositories/products.repository';
import { Injectable } from '@nestjs/common';

interface DeleteProductUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({ id }: DeleteProductUseCaseRequest) {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new ResourceNotFoundError();

    await this.productsRepository.delete(product);
  }
}
