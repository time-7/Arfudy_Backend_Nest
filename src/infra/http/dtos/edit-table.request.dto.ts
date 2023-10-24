import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { CreateTableRequestDto } from './create-table.request.dto';

export class EditTableRequestDto extends PartialType(CreateTableRequestDto) {
  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  id: string;
}
