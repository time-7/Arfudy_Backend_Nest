import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { makeService } from '@test/factories/make-service';
import { FindServiceByIdUseCase } from './find-service-by-id.use-case';

describe('Find Service By Id', () => {
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let sut: FindServiceByIdUseCase;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();
    sut = new FindServiceByIdUseCase(inMemoryServicesRepository);
  });

  it('should be able to find service by id', async () => {
    const newService = makeService();
    await inMemoryServicesRepository.create(newService);

    const { service } = await sut.execute({ id: newService.id.toString() });

    expect(service).toMatchObject(newService);
  });
});
