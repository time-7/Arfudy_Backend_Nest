import { ObjectId } from 'mongodb';

export class UniqueEntityId {
  private value: ObjectId;

  private constructor(value?: number | string) {
    this.value = new ObjectId(value) ?? new ObjectId();
  }

  toString() {
    return this.value.toString();
  }

  toObjectId() {
    return this.value;
  }

  equals(id: UniqueEntityId): boolean {
    return id.toString() === this.toString();
  }

  static createFromInt(value: number) {
    return new UniqueEntityId(value);
  }

  static create() {
    return new UniqueEntityId();
  }

  static createFromRawId(value: string) {
    return new UniqueEntityId(value);
  }
}
