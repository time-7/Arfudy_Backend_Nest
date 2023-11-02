import { Module } from '@nestjs/common';
import { ServicesGateway } from './gateways/services.gateway';

@Module({
  providers: [ServicesGateway],
})
export class WsModule {}
