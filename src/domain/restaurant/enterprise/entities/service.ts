import { Entity } from '@core/entities/entity';
import { Client } from './value-objects/client';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { randomUUID } from 'crypto';

type ServiceProps = {
  tableToken: string;
  serviceToken: string;
  tableId: string;
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

  static create(
    { tableId, tableToken, serviceToken, hasEnded, clients }: ServiceProps,
    id?: UniqueEntityId,
  ) {
    return new Service(
      {
        tableId,
        tableToken,
        serviceToken: serviceToken ?? randomUUID(),
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
