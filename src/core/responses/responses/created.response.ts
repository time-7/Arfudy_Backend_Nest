import { HttpResponse } from '../http.response';

export class CreatedResponse<T, K extends keyof T> implements HttpResponse {
  data: Pick<T, K>;
  message: string;
}
