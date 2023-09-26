import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductRequestDto } from './create-product.request.dto';
import { IsMongoId } from 'class-validator';

export class EditProductRequestDto extends PartialType(
  CreateProductRequestDto,
) {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
