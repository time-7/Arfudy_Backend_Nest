import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'services',
  cors: {
    origin: '*',
  },
})
export class ServiceGateway {
  logger: Logger = new Logger('ServicesQueue');

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newService')
  handleService(@MessageBody() body) {
    this.server.emit('onService', () => {
      message: `Um novo atendimento foi iniciado na mesa ${body.tableNum}`;
      content: body;
    });

    this.logger.log(`Um novo atendimento foi iniciado. serviceId: ${body.id}`);
  }
}
