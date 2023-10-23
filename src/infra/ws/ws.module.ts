import { Module } from '@nestjs/common';
import { ServiceGateway } from './service.gateway';

@Module({
  providers: [ServiceGateway],
})
export class WsModule {}
