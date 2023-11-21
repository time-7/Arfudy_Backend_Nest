import { ServicesGateway } from '@domain/restaurant/application/gateways/services.gateway';

export class InMemoryServicesGateway implements ServicesGateway {
  registerNewService(body: any): void {
    console.log(body);
  }
  registerNewClient(body: any): void {
    console.log(body);
  }
}
