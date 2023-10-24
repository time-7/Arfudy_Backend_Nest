import { ServicesRepository } from '@domain/restaurant/application/repositories/services.repository';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { PrismaServicesMapper } from '../mappers/prisma-services.mapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Socket, io } from 'socket.io-client';
import { ServicePresenter } from '@infra/http/presenters/services.presenter';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';
import { PrismaClientMapper } from '../mappers/prisma-client.mapper';
@Injectable()
export class PrismaServicesRepository implements ServicesRepository {
  private socketClient: Socket;

  constructor(private readonly prisma: PrismaService) {
    this.socketClient = io(`http://localhost:${process.env.PORT}`, {
      transports: ['websocket'],
    });
  }

  async create(entity: Service): Promise<void> {
    const data = PrismaServicesMapper.toPrisma(entity);

    await this.prisma.service.create({ data });

    this.registerNewService(entity);
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
    const clients = service.clients.map(PrismaClientMapper.toPrisma);

    clients.push(PrismaClientMapper.toPrisma(client));

    await this.prisma.service.update({
      where: { id: service.id.toString() },
      data: { clients },
    });

    this.registerNewClientOnService(service);
  }

  async delete(entity: Service): Promise<void> {
    await this.prisma.service.delete({ where: { id: entity.id.toString() } });
  }

  private registerNewService(service: Service): void {
    const data = ServicePresenter.toWs(service);

    this.socketClient.emit('newService', { data });
  }

  private registerNewClientOnService(entity: Service): void {
    const data = ServicePresenter.toWs(entity);

    this.socketClient.emit('newClient', { data });
  }
}
