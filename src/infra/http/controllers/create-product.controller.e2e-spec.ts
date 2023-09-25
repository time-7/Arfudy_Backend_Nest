import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { makeProductWithoutIngredients } from '@test/factories/make-product';
import request from 'supertest';

describe('Create Product (E2E)', () => {
  let app: INestApplication;
  let httpServer;

  beforeAll(async () => {
    process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();

    httpServer = app.getHttpServer();
  });

  it('[POST] /api/products', async () => {
    const product = makeProductWithoutIngredients();

    const response = await request(httpServer).post('/products').send({
      name: product.name,
      description: product.description,
      ingredients: [],
      nutritionFacts: product.nutritionFacts,
      has3dModel: product.has3dModel,
      imageUrl: product.imageUrl,
      price: product.price,
      unityModelId: product.unityModelId,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.id).toBeTruthy();
  });
});
