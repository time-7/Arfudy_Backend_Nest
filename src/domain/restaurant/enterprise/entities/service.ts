import { Client } from './value-objects/client';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { Entity } from '@core/entities/entity';
import { UniqueToken } from '@core/entities/unique-token';

export type ServiceProps = {
  tableToken: UniqueToken;
  serviceToken: UniqueToken;
  tableId: UniqueEntityId;
  hasEnded: boolean;
  clients: Client[];
};

export class Service extends Entity<ServiceProps> {
  get tableId() {
    return this.props.tableId;
  }

  get tableToken() {
    return this.props.tableToken;
  }

  get serviceToken() {
    return this.props.serviceToken;
  }

  get hasEnded() {
    return this.props.hasEnded;
  }

  get clients() {
    return this.props.clients;
  }

  end(): void {
    this.props.hasEnded = true;
  }

  static create(
    { tableId, tableToken, serviceToken, hasEnded, clients }: ServiceProps,
    id?: UniqueEntityId,
  ) {
    return new Service(
      {
        tableId,
        tableToken,
        serviceToken: serviceToken ?? UniqueToken.create(),
        hasEnded,
        clients: clients.map((client) => {
          return Client.create({
            name: client.name,
            clientToken: client.clientToken,
            isAdmin: client.isAdmin,
          });
        }),
      },
      id,
    );
  }
}
