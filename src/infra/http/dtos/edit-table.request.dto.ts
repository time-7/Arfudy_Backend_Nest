import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { CreateTableRequestDto } from './create-table.request.dto';

export class EditTableRequestDto extends PartialType(CreateTableRequestDto) {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
