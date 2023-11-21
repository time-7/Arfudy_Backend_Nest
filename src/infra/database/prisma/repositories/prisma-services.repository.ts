import { ServicesRepository } from '@domain/restaurant/application/repositories/services.repository';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { PrismaServicesMapper } from '../mappers/prisma-services.mapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';
import { PrismaClientMapper } from '../mappers/prisma-client.mapper';

@Injectable()
export class PrismaServicesRepository implements ServicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Service): Promise<void> {
    const data = PrismaServicesMapper.toPrisma(entity);

    await this.prisma.service.create({ data });
  }

  async findMany(): Promise<Service[]> {
    const services = await this.prisma.service.findMany();

    return services.map((service) => PrismaServicesMapper.toDomain(service));
  }

  async findById(id: string): Promise<Service> {
    const service = await this.prisma.service.findFirst({ where: { id } });
    if (!service) return null;

    return PrismaServicesMapper.toDomain(service);
  }

  async findByTableToken(tableToken: string): Promise<Service | null> {
    const service = await this.prisma.service.findFirst({
      where: { tableToken },
    });
    if (!service) return null;

    return PrismaServicesMapper.toDomain(service);
  }

  async save(entity: Service): Promise<void> {
    const data = PrismaServicesMapper.toPrismaUpdate(entity);

    await this.prisma.service.update({
      where: { id: entity.id.toString() },
      data,
    });
  }

  async addClient(service: Service, client: Client): Promise<void> {
    const clients = service.clients;

    clients.push(client);

    await this.prisma.service.update({
      where: { id: service.id.toString() },
      data: { clients: clients.map(PrismaClientMapper.toPrisma) },
    });
  }

  async delete(entity: Service): Promise<void> {
    await this.prisma.service.delete({ where: { id: entity.id.toString() } });
  }
}
