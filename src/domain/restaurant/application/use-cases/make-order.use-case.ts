import { UniqueToken } from '@core/entities/unique-token';
import { Order, Status } from '../../enterprise/entities/order';
import { Product } from '../../enterprise/entities/value-objects/products';
import { OrdersRepository } from '../repositories/orders.repository';
import { ServicesRepository } from '../repositories/services.repository';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

export type MakeOrderUseCaseRequest = {
  products: Product[];
  clientToken: string;
  serviceId: string;
  status: Status;
};

export class MakeOrderUseCase {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute({
    products,
    clientToken,
    serviceId,
    status,
  }: MakeOrderUseCaseRequest) {
    const service = await this.servicesRepository.findById(serviceId);
    if (!service) throw new ResourceNotFoundError('Atendimento não encontrado');

    const order = Order.create({
      clientToken: UniqueToken.createFromRaw(clientToken),
      products,
      serviceId: UniqueEntityId.createFromRawId(serviceId),
      status,
    });

    await this.ordersRepository.create(order);
  }
}
