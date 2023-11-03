import { ApiProperty } from '@nestjs/swagger';
import {
  Client,
  ClientProps,
} from '@domain/restaurant/enterprise/entities/value-objects/client';

export class ClientPresenter {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  clientToken: string;

  private constructor({ name, isAdmin, clientToken }: Partial<ClientProps>) {
    this.name = name;
    this.isAdmin = isAdmin;
    this.clientToken = clientToken.toString();
  }

  static toHttp(client: Client) {
    return new ClientPresenter({
      name: client.name,
      isAdmin: client.isAdmin,
      clientToken: client.clientToken,
    });
  }

  static toWs(client: Client) {
    return {
      name: client.name,
    };
  }
}
