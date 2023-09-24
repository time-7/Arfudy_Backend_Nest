import { ProductsRepository } from '@domain/menu/application/repositories/products.repository';
import { Product } from '@domain/menu/enterprise/entities/products';
import { PrismaService } from '../prisma.service';
import { PrismaProductsMapper } from '../mappers/prisma-products.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(product: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  async findMany(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();

    return products.map(PrismaProductsMapper.toDomain);
  }
  findById(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  delete(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
