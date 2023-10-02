import { Entity } from '@core/entities/entity';
import { randomUUID } from 'crypto';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

export interface TableProps {
  tableNum: number;
  activeToken: string;
  seatNum: number;
}

export class Table extends Entity<TableProps> {
  get tableNum(): number {
    return this.props.tableNum;
  }
  set tableNum(tableNum: number) {
    this.props.tableNum = tableNum;
  }
  get activeToken(): string {
    return this.props.activeToken;
  }
  set activeToken(activeToken: string) {
    this.props.activeToken = activeToken;
  }
  get seatNum(): number {
    return this.props.seatNum;
  }
  set seatNum(seatNum: number) {
    this.props.seatNum = seatNum;
  }

  static create(
    { tableNum, activeToken, seatNum }: TableProps,
    id?: UniqueEntityId,
  ) {
    return new Table(
      {
        tableNum,
        activeToken: activeToken ?? randomUUID(),
        seatNum,
      },
      id,
    );
  }
}
