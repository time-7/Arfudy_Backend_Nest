import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  ValidateNested,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Category } from '@domain/restaurant/enterprise/entities/value-objects/products';

class ProductRequestDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsNumber()
  quantity: number;
  @IsEnum(Category)
  category: Category;
  @IsDate()
  @Type(() => Date)
  date: Date;
}

export class OrderRequestDto {
  @ValidateNested()
  @Type(() => ProductRequestDto)
  products: ProductRequestDto[];
  @IsString()
  serviceId: string;
}
