import {
  OrdersGateway,
  newOrderBody,
} from '@domain/restaurant/application/gateways/orders.gateway';
import { OrderPresenter } from '@infra/http/presenters/order.presenter';
import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WsOrdersGateway implements OrdersGateway {
  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger(WsOrdersGateway.name);

  @SubscribeMessage('newOrder')
  registerNewOrder(@MessageBody() body: newOrderBody) {
    const data = body.data;

    this.server.emit('onOrder', {
      message: `Um novo pedido foi realizado pelo cliente ${data.client.name}`,
      data: OrderPresenter.toHttp(
        data.order,
        data.client,
        data.service,
        data.table,
      ),
    });

    this.logger.log(
      `Um novo pedido foi realizado na mesa ${data.table.tableNum} para o cliente ${data.client.name}`,
    );
  }
}
