import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTableRequestDto {
  @IsString()
  @ApiProperty()
  activeToken: string;

  @IsString()
  @ApiProperty()
  tableNum: number;

  @IsString()
  @ApiProperty()
  seatNum: number;
}
