import { Optional } from '@core/types/optional';
import { HttpResponse } from '../http.response';

export class FindAllResponse<T> implements Optional<HttpResponse, 'message'> {
  data: T[];
  message?: string;
}
