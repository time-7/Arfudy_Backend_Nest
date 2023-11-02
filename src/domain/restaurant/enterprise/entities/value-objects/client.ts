import { Optional } from '@core/types/optional';
import { ValueObject } from '@core/entities/value-object';
import { UniqueToken } from '@core/entities/unique-token';

export type ClientProps = {
  name: string;
  isAdmin: boolean;
  clientToken: UniqueToken;
};

export class Client extends ValueObject<ClientProps> {
  set name(name: string) {
    this.props.name = name;
  }

  get name(): string {
    return this.props.name;
  }

  set isAdmin(isAdmin: boolean) {
    this.props.isAdmin = isAdmin;
  }

  get isAdmin(): boolean {
    return this.props.isAdmin;
  }

  get clientToken(): UniqueToken {
    return this.props.clientToken;
  }

  static create({
    name,
    isAdmin,
    clientToken,
  }: Optional<ClientProps, 'clientToken'>) {
    return new Client({
      name,
      isAdmin,
      clientToken: clientToken ?? UniqueToken.create(),
    });
  }
}
