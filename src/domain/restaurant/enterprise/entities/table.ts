import { Entity } from '@core/entities/entity';

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
}
