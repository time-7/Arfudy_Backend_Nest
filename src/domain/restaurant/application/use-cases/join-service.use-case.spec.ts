import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { JoinServiceUseCase } from './join-service.use-case';
import { makeService } from '@test/factories/make-service';
import { MakeClient } from '@test/factories/make-client';

describe('Join Service', () => {
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let sut: JoinServiceUseCase;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();

    sut = new JoinServiceUseCase(inMemoryServicesRepository);
  });

  it('should be able to add a client to an ongoing service', async () => {
    const service = makeService();
    const client = MakeClient();

    await inMemoryServicesRepository.create(service);

    await sut.execute({
      tableToken: service.tableToken.toString(),
      client: {
        name: client.name,
      },
    });

    expect(inMemoryServicesRepository.items[0].clients[1].name).toEqual(
      client.name,
    );
  });
});
