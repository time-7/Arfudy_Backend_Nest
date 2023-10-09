import { makeProductWithoutIngredients } from '@test/factories/make-product';
import request from 'supertest';
import { PrismaProductsMapper } from '../../database/prisma/mappers/prisma-products.mapper';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Test } from '@nestjs/testing';

describe('Find Product By Id (E2E)', () => {
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
  describe('[GET] /api/products/id', () => {
    it('should be able to get a product by id', async () => {
      const product = makeProductWithoutIngredients();
      await prisma.product.create({
        data: PrismaProductsMapper.toPrisma(product),
      });

      const response = await request(httpServer).get(
        `/products/${product.id.toString()}`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.data.id).toEqual(product.id.toString());
    });
  });
});
