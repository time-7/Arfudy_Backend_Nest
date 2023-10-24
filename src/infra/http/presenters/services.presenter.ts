import { Service } from '@domain/restaurant/enterprise/entities/service';
import { ClientPresenter } from './client.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class ServicePresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tableId: string;

  @ApiProperty()
  tableToken: string;

  @ApiProperty({ type: () => ClientPresenter })
  clients: ClientPresenter[];

  @ApiProperty()
  serviceToken: string;

  @ApiProperty()
  hasEnded: boolean;

  static toHttp(entity: Service) {
    return {
      id: entity.id.toString(),
      tableId: entity.tableId.toString(),
      tableToken: entity.tableToken.toString(),
      clients: entity.clients.map(ClientPresenter.toHttp),
      serviceToken: entity.serviceToken.toString(),
      hasEnded: entity.hasEnded,
    };
  }

  static toWs(entity: Service) {
    return {
      id: entity.id.toString(),
      tableId: entity.tableId.toString(),
      tableToken: entity.tableToken,
      hasEnded: entity.hasEnded,
      clients: entity.clients.map(ClientPresenter.toHttp),
    };
  }
}
