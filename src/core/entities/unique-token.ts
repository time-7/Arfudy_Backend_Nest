import { randomUUID } from 'crypto';

export class UniqueToken {
  private value: string;

  toString(): string {
    return this.value.toString();
  }

  private constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  static create(): UniqueToken {
    return new UniqueToken();
  }

  static createFromRaw(rawToken: string) {
    return new UniqueToken(rawToken);
  }
}
