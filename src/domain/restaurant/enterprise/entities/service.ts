import { Client } from './value-objects/client';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { UniqueToken } from '@core/entities/unique-token';
import { AggregateRoot } from '@core/entities/aggregate-root';
import { Optional } from '@prisma/client/runtime/library';
import { Order } from './order';

export type ServiceProps = {
  tableToken: UniqueToken;
  serviceToken: UniqueToken;
  tableId: UniqueEntityId;
  hasEnded: boolean;
  clients: Client[];
  orders: Order[];
};

export class Service extends AggregateRoot<ServiceProps> {
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

  get orders(): Order[] {
    return this.props.orders;
  }

  set orders(orders: Order[]) {
    this.props.orders = orders;
  }

  end(): void {
    this.props.hasEnded = true;
  }

  static create(
    {
      tableId,
      tableToken,
      serviceToken,
      hasEnded,
      clients,
      orders,
    }: Optional<ServiceProps, 'orders'>,
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
        orders: orders ?? [],
      },
      id,
    );
  }
}
