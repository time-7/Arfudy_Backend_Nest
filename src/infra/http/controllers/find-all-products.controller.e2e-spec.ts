import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { makeProductWithoutIngredients } from '@test/factories/make-product';
import request from 'supertest';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PrismaProductsMapper } from '../../database/prisma/mappers/prisma-products.mapper';

describe('Find All Products (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let httpServer;

  beforeAll(async () => {
    process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();

    httpServer = app.getHttpServer();
  });

  it('[GET] /api/products', async () => {
    const product = makeProductWithoutIngredients();
    await prisma.product.create({
      data: PrismaProductsMapper.toPrisma(product),
    });

    const response = await request(httpServer).get('/products');

    expect(response.statusCode).toBe(200);
    expect(response.body.products.length).toBeGreaterThanOrEqual(1);
  });
});
