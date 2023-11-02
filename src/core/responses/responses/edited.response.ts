import { ApiProperty } from '@nestjs/swagger';
import { HttpResponse } from '../http.response';

export class EditedResponse<T, K extends keyof T> implements HttpResponse {
  @ApiProperty()
  data: Pick<T, K>;
  @ApiProperty()
  message: string;
}
