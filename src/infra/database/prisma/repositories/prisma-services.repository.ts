import { ServicesRepository } from '@domain/restaurant/application/repositories/services.repository';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { PrismaServicesMapper } from '../mappers/prisma-services.mapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

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

  findById(id: string): Promise<Service> {
    throw new Error('Method not implemented.');
  }

  async findByTableToken(tableToken: string): Promise<Service | null> {
    const service = await this.prisma.service.findFirst({
      where: { tableToken },
    });
    if (!service) return null;

    return PrismaServicesMapper.toDomain(service);
  }

  save(entity: Service): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(entity: Service): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
