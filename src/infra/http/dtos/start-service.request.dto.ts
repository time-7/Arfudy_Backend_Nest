import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ClientRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;
}

export class StartServiceRequestDto {
  @ApiProperty()
  @IsString()
  tableToken: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  serviceToken: string;

  @ApiProperty()
  @IsMongoId()
  tableId: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasEnded: boolean;

  @ValidateNested()
  @Type(() => ClientRequestDto)
  @ApiProperty({ type: () => ClientRequestDto })
  client: ClientRequestDto;
}
