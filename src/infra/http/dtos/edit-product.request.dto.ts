import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductRequestDto } from './create-product.request.dto';
import { IsMongoId, IsOptional } from 'class-validator';

export class EditProductRequestDto extends PartialType(
  CreateProductRequestDto,
) {
  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  id: string;
}
