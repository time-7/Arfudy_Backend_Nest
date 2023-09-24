import { ProductsRepository } from '@domain/menu/application/repositories/products.repository';
import { Product } from '@domain/menu/enterprise/entities/products';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.items.push(product);

    return product;
  }

  async findMany(): Promise<Product[]> {
    return this.items;
  }

  async findById(id: string): Promise<Product> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);

    const product = this.items[itemIndex];
    if (!product) return null;

    return product;
  }

  async delete(product: Product): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === product.id);
    this.items.splice(itemIndex, 1);
  }
}
