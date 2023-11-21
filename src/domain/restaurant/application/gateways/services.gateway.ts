export abstract class ServicesGateway {
  abstract registerNewService(body): void;
  abstract registerNewClient(body): void;
}
