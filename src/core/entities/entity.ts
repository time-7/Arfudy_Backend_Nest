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

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
