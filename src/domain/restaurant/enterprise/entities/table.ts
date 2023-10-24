import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { UniqueToken } from '@core/entities/unique-token';

export interface TableProps {
  tableNum: number;
  activeToken: UniqueToken;
  seatNum: number;
}

export class Table extends Entity<TableProps> {
  get tableNum(): number {
    return this.props.tableNum;
  }
  set tableNum(tableNum: number) {
    this.props.tableNum = tableNum;
  }
  get activeToken(): UniqueToken {
    return this.props.activeToken;
  }
  set activeToken(activeToken: string) {
    this.props.activeToken = UniqueToken.createFromRaw(activeToken);
  }
  get seatNum(): number {
    return this.props.seatNum;
  }
  set seatNum(seatNum: number) {
    this.props.seatNum = seatNum;
  }

  refreshToken(): void {
    this.props.activeToken = UniqueToken.create();
  }

  static create(
    { tableNum, activeToken, seatNum }: TableProps,
    id?: UniqueEntityId,
  ) {
    return new Table(
      {
        tableNum,
        activeToken: activeToken ?? UniqueToken.create(),
        seatNum,
      },
      id,
    );
  }
}
