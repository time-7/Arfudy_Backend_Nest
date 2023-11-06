import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ServicesGateway {
  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger(ServicesGateway.name);

  @SubscribeMessage('newService')
  onNewService(@MessageBody() body) {
    this.server.emit('onService', {
      message: `Um novo atendimento foi iniciado para a mesa ${body.data.tableId}`,
      data: body.data,
    });

    this.logger.log(
      `Um novo atendimento foi iniciado na mesa ${body.data.tableId}`,
    );
  }

  @SubscribeMessage('newClient')
  onNewClient(@MessageBody() body) {
    this.server.emit('onClient', {
      message: `${body.newClient.name} juntou-se ao atendimento ${body.data.id}`,
      data: body.data,
    });

    this.logger.log(
      `${body.newClient.name} juntou-se ao atendimento ${body.data.id}`,
    );
  }
}
