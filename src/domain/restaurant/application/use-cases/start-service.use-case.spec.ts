import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { StartServiceUseCase } from './start-service.use-case';
import { makeService } from '@test/factories/make-service';

describe('Create Service', () => {
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let sut: StartServiceUseCase;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();

    sut = new StartServiceUseCase(inMemoryServicesRepository);
  });

  it('should be able to create a service and have an active token', async () => {
    const service = makeService();

    await sut.execute({
      tableId: service.tableId,
      tableToken: service.tableToken,
      serviceToken: service.serviceToken,
      hasEnded: service.hasEnded,
      client: service.clients[0],
    });

    expect(inMemoryServicesRepository.items).toHaveLength(1);
  });
});
