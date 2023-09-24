import { Product } from '../../enterprise/entities/products';

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findMany(): Promise<Product[]>;
  abstract findById(id: string): Promise<Product | null>;
  abstract delete(product: Product): Promise<void>;
}
