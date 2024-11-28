import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested, IsEnum } from 'class-validator';
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
}

export class OrderRequestDto {
  @ValidateNested()
  @Type(() => ProductRequestDto)
  products: ProductRequestDto[];
  @IsString()
  serviceId: string;
}
