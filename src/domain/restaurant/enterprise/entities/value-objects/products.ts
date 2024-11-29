import { ValueObject } from '@core/entities/value-object';

export enum Status {
  PENDING = 'PENDING',
  IN_PREPARE = 'IN_PREPARE',
  DONE = 'DONE',
  DELIVERED = 'DELIVERED',
}

export enum Category {
  DRINK = 'DRINK',
  FOOD = 'FOOD',
}

export type ProductProps = {
  id: string;
  name: string;
  quantity: number;
  status?: Status;
  category: Category;
};

export class Product extends ValueObject<ProductProps> {
  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get status(): Status {
    return this.props.status;
  }

  changeStatus(status: Status): void {
    this.props.status = status;
  }

  get category(): Category {
    return this.props.category;
  }

  static create({
    id,
    name,
    quantity,
    status,
    category,
  }: ProductProps): Product {
    return new Product({
      id,
      name,
      quantity,
      status: status ?? Status.PENDING,
      category,
    });
  }
}
