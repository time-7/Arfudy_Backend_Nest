import { Optional } from '@core/types/optional';
import { HttpResponse } from '../http.response';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllResponse<T> implements Optional<HttpResponse, 'message'> {
  @ApiProperty()
  data: T[];
  @ApiPropertyOptional()
  message?: string;
}
