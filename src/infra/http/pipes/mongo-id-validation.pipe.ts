import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform<string> {
  private messages: string[] = ['Id fornecido não é um Object Id valido!'];

  transform(value: string): string {
    if (ObjectId.isValid(value)) {
      if (String(new ObjectId(value)) === value) return value;
    }

    throw new BadRequestException(this.messages);
  }
}
