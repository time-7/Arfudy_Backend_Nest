import {
  TableProps,
  Table,
} from '@domain/restaurant/enterprise/entities/table';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@prisma/client/runtime/library';

export class TablePresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  activeToken: string;
  @ApiProperty()
  tableNum: number;
  @ApiProperty()
  seatNum: number;

  private constructor(
    { activeToken, tableNum, seatNum }: Optional<TableProps>,
    id: string,
  ) {
    this.id = id;
    this.activeToken = activeToken.toString();
    this.seatNum = seatNum;
    this.tableNum = tableNum;
  }

  static toHttp(table: Table) {
    return new TablePresenter(
      {
        seatNum: table.seatNum,
        activeToken: table.activeToken,
        tableNum: table.tableNum,
      },
      table.id.toString(),
    );
  }
}
