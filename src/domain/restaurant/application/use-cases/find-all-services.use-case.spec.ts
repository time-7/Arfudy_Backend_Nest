import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { FindAllServicesUseCase } from './find-all-services.use-case';
import { makeService } from '@test/factories/make-service';

describe('Find All Services', () => {
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let sut: FindAllServicesUseCase;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();
    sut = new FindAllServicesUseCase(inMemoryServicesRepository);
  });

  it('should be able to fetch Services', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryServicesRepository.create(makeService());
    }

    const { services } = await sut.execute();

    expect(services).toHaveLength(10);
  });
});
