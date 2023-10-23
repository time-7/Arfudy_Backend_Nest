import { Optional } from '@core/types/optional';
import { randomUUID } from 'crypto';

export class Client {
  name: string;
  isAdmin: boolean;
  clientToken: string;

  private constructor({
    name,
    isAdmin,
    clientToken,
  }: Optional<Client, 'clientToken'>) {
    this.name = name;
    this.isAdmin = isAdmin;
    this.clientToken = clientToken ?? randomUUID();
  }

  static create({
    name,
    isAdmin,
    clientToken,
  }: Optional<Client, 'clientToken'>) {
    return new Client({
      name,
      isAdmin,
      clientToken,
    });
  }
}
