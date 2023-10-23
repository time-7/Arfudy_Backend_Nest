import { Service } from '@domain/restaurant/enterprise/entities/service';

export class ServicePresenter {
  static toHttp(entity: Service) {
    return {
      id: entity.id.toString(),
      tableId: entity.tableId,
      tableToken: entity.tableToken,
      clients: entity.clients,
      serviceToken: entity.serviceToken,
      hasEnded: entity.hasEnded,
    };
  }
}
