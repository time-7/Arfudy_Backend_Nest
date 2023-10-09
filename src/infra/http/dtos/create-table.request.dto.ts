import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTableRequestDto {
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  activeToken?: string;

  @IsInt()
  @ApiProperty()
  tableNum: number;

  @IsInt()
  @ApiProperty()
  seatNum: number;
}
