import { UseCaseResponse } from '../use-case.response';

export class CreatedResponse<T, K extends keyof T> implements UseCaseResponse {
  data: Pick<T, K>;
  message: string;
}
