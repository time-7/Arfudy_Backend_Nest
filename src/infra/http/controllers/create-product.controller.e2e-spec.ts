import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import {
  makeProductWithIngredients,
  makeProductWithoutIngredients,
} from '@test/factories/make-product';
import request from 'supertest';

describe('Create Product (E2E)', () => {
  let app: INestApplication;
  let httpServer;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();

    httpServer = app.getHttpServer();
  });

  describe('[POST] /api/products', () => {
    it('should be able to create a product with ingredients', async () => {
      const product = makeProductWithIngredients();

      const response = await request(httpServer).post('/products').send({
        name: product.name,
        description: product.description,
        ingredients: product.ingredients,
        nutritionFacts: null,
        has3dModel: product.has3dModel,
        imageUrl: product.imageUrl,
        price: product.price,
        unityModelId: product.unityModelId,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.data.id).toBeTruthy();
    });

    it('should be able to create a product without ingredients but with nutrition facts', async () => {
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

    it('should not be able to create a product without ingredients/nutritionFacts', async () => {
      const product = makeProductWithoutIngredients();

      const response = await request(httpServer).post('/products').send({
        name: product.name,
        description: product.description,
        ingredients: [],
        nutritionFacts: null,
        has3dModel: product.has3dModel,
        imageUrl: product.imageUrl,
        price: product.price,
        unityModelId: product.unityModelId,
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
