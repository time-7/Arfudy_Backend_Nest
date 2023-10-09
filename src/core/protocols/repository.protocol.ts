export interface RepositoryProtocol<T> {
  create(entity: T): Promise<void>;
  findMany(): Promise<T[]>;
  findById(id: string): Promise<T>;
  save(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}
