import { Prisma } from '@prisma/client';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';

export class PrismaClientMapper {
  static toPrisma(client: Client): Prisma.clientCreateInput {
    return {
      name: client.name,
      isAdmin: client.isAdmin,
      clientToken: client.clientToken.toString(),
    };
  }
}
