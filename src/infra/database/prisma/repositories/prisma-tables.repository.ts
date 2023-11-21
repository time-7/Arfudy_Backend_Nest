import { Injectable } from '@nestjs/common';
import { TablesRepository } from '@domain/restaurant/application/repositories/table.repository';
import { Table } from '@domain/restaurant/enterprise/entities/table';
import { PrismaTablesMapper } from '../mappers/prisma-tables.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTablesRepository implements TablesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Table): Promise<void> {
    const data = PrismaTablesMapper.toPrisma(entity);

    await this.prisma.table.create({ data });
  }

  async findMany(): Promise<Table[]> {
    const tables = await this.prisma.table.findMany();

    return tables.map(PrismaTablesMapper.toDomain);
  }

  async findById(id: string): Promise<Table | null> {
    const table = await this.prisma.table.findFirst({ where: { id } });
    if (!table) return null;

    return PrismaTablesMapper.toDomain(table);
  }

  async findByToken(activeToken: string): Promise<Table> {
    const table = await this.prisma.table.findFirst({ where: { activeToken } });
    if (!table) return null;

    return PrismaTablesMapper.toDomain(table);
  }

  async save(entity: Table): Promise<void> {
    const data = PrismaTablesMapper.toPrismaUpdate(entity);

    await this.prisma.table.update({
      where: { id: entity.id.toString() },
      data,
    });
  }

  async delete(entity: Table): Promise<void> {
    await this.prisma.table.delete({ where: { id: entity.id.toString() } });
  }
}
