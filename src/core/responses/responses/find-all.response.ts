import { Optional } from '../../types/optional';
import { UseCaseResponse } from '../use-case.response';

export class FindAllResponse<T>
  implements Optional<UseCaseResponse, 'message'>
{
  data: T[];
  message?: string;
}
