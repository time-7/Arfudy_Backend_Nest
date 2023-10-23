import { Prisma, Service as PrismaService } from '@prisma/client';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id';

export class PrismaServicesMapper {
  static toPrisma(entity: Service): Prisma.ServiceUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      tableId: entity.tableId,
      tableToken: entity.tableToken,
      serviceToken: entity.serviceToken,
      hasEnded: entity.hasEnded,
      clients: entity.clients,
    };
  }

  static toDomain(raw: PrismaService) {
    return Service.create(
      {
        tableId: raw.tableId,
        tableToken: raw.tableToken,
        clients: raw.clients,
        hasEnded: raw.hasEnded,
        serviceToken: raw.serviceToken,
      },
      UniqueEntityId.createFromRawId(raw.id),
    );
  }
}
