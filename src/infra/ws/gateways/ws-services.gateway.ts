import { ServicesGateway } from '@domain/restaurant/application/gateways/services.gateway';
import { Service } from '@domain/restaurant/enterprise/entities/service';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';
import { ServicePresenter } from '@infra/http/presenters/services.presenter';
import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

export type newClientOnService = {
  client: Client;
  serviceId: string;
};

@WebSocketGateway()
export class WsServicesGateway implements ServicesGateway {
  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger(WsServicesGateway.name);

  @SubscribeMessage('newService')
  registerNewService(@MessageBody() service: Service) {
    const data = ServicePresenter.toWs(service);
    this.server.emit('onService', {
      message: `Um novo atendimento foi iniciado para a mesa ${data.tableId}`,
      data,
    });

    this.logger.log(`Um novo atendimento foi iniciado na mesa ${data.tableId}`);
  }

  @SubscribeMessage('newClient')
  registerNewClient(@MessageBody() data: newClientOnService) {
    this.server.emit('onClient', {
      message: `${data.client.name} juntou-se ao atendimento ${data.serviceId}`,
    });

    this.logger.log(
      `${data.client.name} juntou-se ao atendimento ${data.serviceId}`,
    );
  }
}
