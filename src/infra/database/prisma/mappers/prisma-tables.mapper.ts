import { Prisma, Table as PrismaTable } from '@prisma/client';
import { Table } from '@domain/restaurant/enterprise/entities/table';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

export class PrismaTablesMapper {
  static toDomain(raw: PrismaTable): Table {
    return Table.create(
      {
        activeToken: raw.activeToken,
        seatNum: raw.seatNum,
        tableNum: raw.tableNum,
      },
      UniqueEntityId.createFromRawId(raw.id),
    );
  }
  static toPrisma(table: Table): Prisma.TableUncheckedCreateInput {
    return {
      id: table.id.toString(),
      activeToken: table.activeToken,
      seatNum: table.seatNum,
      tableNum: table.tableNum,
    };
  }

  static toPrismaUpdate(table: Table): Prisma.TableUpdateInput {
    return {
      activeToken: table.activeToken,
      seatNum: table.seatNum,
      tableNum: table.tableNum,
    };
  }
}
