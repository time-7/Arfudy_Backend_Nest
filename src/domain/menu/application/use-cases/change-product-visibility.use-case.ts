import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

export interface ChangeProductVisibilityUseCaseRequest {
  id: string;
}

@Injectable()
export class ChangeProductVisibilityUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({ id }: ChangeProductVisibilityUseCaseRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new ResourceNotFoundError('Produto não encontrado!');

    product.changeVisibility();

    await this.productsRepository.save(product);
  }
}
