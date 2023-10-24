import { Prisma, Service as PrismaService } from '@prisma/client';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';
import { UniqueToken } from '@core/entities/unique-token';

export class PrismaServicesMapper {
  static toPrisma(entity: Service): Prisma.ServiceUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      tableId: entity.tableId.toString(),
      tableToken: entity.tableToken.toString(),
      serviceToken: entity.serviceToken.toString(),
      hasEnded: entity.hasEnded,
      clients: entity.clients.map((client) => {
        return {
          name: client.name,
          isAdmin: client.isAdmin,
          clientToken: client.clientToken.toString(),
        };
      }),
    };
  }

  static toPrismaUpdate(entity: Service): Prisma.ServiceUncheckedUpdateInput {
    return {
      tableId: entity.tableId.toString(),
      tableToken: entity.tableToken.toString(),
      serviceToken: entity.serviceToken.toString(),
      hasEnded: entity.hasEnded,
      clients: entity.clients.map((client) => {
        return {
          name: client.name,
          isAdmin: client.isAdmin,
          clientToken: client.clientToken.toString(),
        };
      }),
    };
  }

  static toDomain(raw: PrismaService) {
    return Service.create(
      {
        tableId: UniqueEntityId.createFromRawId(raw.tableId),
        tableToken: UniqueToken.createFromRaw(raw.tableToken),
        clients: raw.clients.map((client) => {
          return Client.create({
            name: client.name,
            isAdmin: client.isAdmin,
            clientToken: UniqueToken.createFromRaw(client.clientToken),
          });
        }),
        hasEnded: raw.hasEnded,
        serviceToken: UniqueToken.createFromRaw(raw.serviceToken),
      },
      UniqueEntityId.createFromRawId(raw.id),
    );
  }
}
