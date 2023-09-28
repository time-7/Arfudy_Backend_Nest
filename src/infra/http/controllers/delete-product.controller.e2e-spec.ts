import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { makeProductWithIngredients } from '@test/factories/make-product';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PrismaProductsMapper } from '../../database/prisma/mappers/prisma-products.mapper';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

describe('Delete Product (E2E)', () => {
  let app: INestApplication;
  let httpServer;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();

    httpServer = app.getHttpServer();
    prisma = app.get(PrismaService);
  });

  describe('[DELETE] /api/products/id', () => {
    it('should be able to delete a product', async () => {
      const product = makeProductWithIngredients();
      const data = PrismaProductsMapper.toPrisma(product);
      await prisma.product.create({ data });

      const response = await request(httpServer).delete(
        `/products/${product.id.toString()}`,
      );

      expect(response.statusCode).toBe(200);
    });

    it('should not be able to delete a product that does not exist', async () => {
      const response = await request(httpServer).delete(
        `/products/${UniqueEntityId.create().toString()}`,
      );

      expect(response.statusCode).toBe(500);
    });
  });
});
