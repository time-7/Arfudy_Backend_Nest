import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

class ProductRequestDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsNumber()
  quantity: number;
}

export class OrderRequestDto {
  @ValidateNested()
  @Type(() => ProductRequestDto)
  products: ProductRequestDto[];
  @IsString()
  serviceId: string;
}
