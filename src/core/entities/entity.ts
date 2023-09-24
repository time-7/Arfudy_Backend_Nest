import { UniqueEntityId } from './unique-entity-id';

export abstract class Entity<T> {
  protected _id: UniqueEntityId;
  protected constructor(
    protected props: T,
    id?: UniqueEntityId,
  ) {
    this._id = id ?? UniqueEntityId.create();
  }

  get id() {
    return this._id;
  }
}
