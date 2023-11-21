import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@domain/restaurant/enterprise/entities/value-objects/client';

export class ClientPresenter {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  clientToken: string;

  private constructor({
    name,
    isAdmin,
    clientToken,
  }: Partial<ClientPresenter>) {
    this.name = name;
    this.isAdmin = isAdmin;
    this.clientToken = clientToken.toString();
  }

  static toHttp(client: Client) {
    return new ClientPresenter({
      name: client.name,
      isAdmin: client.isAdmin,
      clientToken: client.clientToken.toString(),
    });
  }

  static toWs(client: Client) {
    return {
      name: client.name,
    };
  }
}
