import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class StartServiceRequestDto {
  @IsString()
  tableToken: string;
  @IsString()
  @IsOptional()
  serviceToken: string;
  @IsMongoId()
  tableId: string;
  @IsBoolean()
  @IsOptional()
  hasEnded: boolean;
  @IsNotEmpty()
  client: Client;
}
