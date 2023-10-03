export interface MapperProtocol<T, K, J> {
  toDomain(raw: K): T;
  toPrisma(entity: T): K;
  toPrismaUpdate(entity: T): J;
}
