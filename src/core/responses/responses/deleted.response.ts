import { ApiProperty } from '@nestjs/swagger';
import { HttpResponse } from '../http.response';

export class DeletedResponse implements HttpResponse {
  @ApiProperty()
  message: string;
}
