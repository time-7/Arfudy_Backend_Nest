import { ProductsRepository } from '@domain/menu/application/repositories/products.repository';
import { Product } from '@domain/menu/enterprise/entities/products';
import { PrismaService } from '../prisma.service';
import { PrismaProductsMapper } from '../mappers/prisma-products.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const data = PrismaProductsMapper.toPrisma(product);
    const newProduct = await this.prisma.product.create({ data });

    return PrismaProductsMapper.toDomain(newProduct);
  }
  async findMany(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();

    return products.map(PrismaProductsMapper.toDomain);
  }
  async findById(id: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: { id },
    });
    if (!product) return null;

    return PrismaProductsMapper.toDomain(product);
  }
  async delete(product: Product): Promise<void> {
    await this.prisma.product.delete({
      where: { id: product.id.toString() },
    });
  }
}
