import { ServicesRepository } from '@domain/restaurant/application/repositories/services.repository';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { PrismaServicesMapper } from '../mappers/prisma-services.mapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class PrismaServicesRepository implements ServicesRepository {
  socketClient: Socket;

  constructor(private readonly prisma: PrismaService) {
    this.socketClient = io(`http://localhost:${process.env.PORT}`, {
      transports: ['websocket'],
    });
  }

  async create(entity: Service): Promise<void> {
    const data = PrismaServicesMapper.toPrisma(entity);

    await this.prisma.service.create({ data });

    this.registerConsumerEvents(entity);
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

  private registerConsumerEvents(body: Service): void {
    this.socketClient.emit('newService', { data: body });
  }
}
