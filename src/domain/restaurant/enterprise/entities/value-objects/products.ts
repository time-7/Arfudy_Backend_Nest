import { ValueObject } from '@core/entities/value-object';

export type ProductProps = {
  name: string;
  quantity: number;
};

export class Product extends ValueObject<ProductProps> {
  get name(): string {
    return this.props.name;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  static create({ name, quantity }: ProductProps): Product {
    return new Product({ name, quantity });
  }
}
