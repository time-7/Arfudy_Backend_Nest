import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { makeProductWithIngredients } from '@test/factories/make-product';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PrismaProductsMapper } from '../../database/prisma/mappers/prisma-products.mapper';
import { makeIngredient } from '@test/factories/make-ingredient';
import { makeNutritionFacts } from '@test/factories/make-nutrition-facts';

describe('Edit Product (E2E)', () => {
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

  describe('[PATCH] /api/products', () => {
    it('should be able to edit a product with new ingredients', async () => {
      const product = makeProductWithIngredients();
      const data = PrismaProductsMapper.toPrisma(product);

      await prisma.product.create({ data });

      const response = await request(httpServer)
        .patch(`/products/${product.id.toString()}`)
        .send({
          name: product.name,
          description: product.description,
          ingredients: [makeIngredient()],
          nutritionFacts: null,
          has3dModel: product.has3dModel,
          imageUrl: product.imageUrl,
          price: product.price,
          unityModelId: product.unityModelId,
        });

      expect(response.statusCode).toBe(200);
    });

    it('should be able to edit a product without ingredients but with new nutrition facts', async () => {
      const product = makeProductWithIngredients();
      const data = PrismaProductsMapper.toPrisma(product);

      await prisma.product.create({ data });

      const response = await request(httpServer)
        .patch(`/products/${product.id.toString()}`)
        .send({
          name: product.name,
          description: product.description,
          ingredients: [],
          nutritionFacts: makeNutritionFacts(),
          has3dModel: product.has3dModel,
          imageUrl: product.imageUrl,
          price: product.price,
          unityModelId: product.unityModelId,
        });

      expect(response.statusCode).toBe(200);
    });

    it('should not be able to edit a product without new ingredients/nutritionFacts', async () => {
      const product = makeProductWithIngredients();
      const data = PrismaProductsMapper.toPrisma(product);

      await prisma.product.create({ data });

      const response = await request(httpServer)
        .patch(`/products/${product.id.toString()}`)
        .send({
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
