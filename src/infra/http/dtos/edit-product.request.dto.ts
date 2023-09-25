import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductRequestDto } from './create-product.request.dto';

export class EditProductRequestDto extends PartialType(
  CreateProductRequestDto,
) {
  @ApiProperty()
  id: string;
}
