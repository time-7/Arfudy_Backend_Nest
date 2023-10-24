import request from 'supertest';
import { PrismaTablesMapper } from '@infra/database/prisma/mappers/prisma-tables.mapper';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../../app.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { makeTable } from '@test/factories/make-table';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

describe('Find Table By Id (E2E)', () => {
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

  describe('[GET] /api/tables/id', () => {
    it('should be able to get a table by id', async () => {
      const table = makeTable();
      await prisma.table.create({
        data: PrismaTablesMapper.toPrisma(table),
      });

      const response = await request(httpServer).get(
        `/tables/${table.id.toString()}`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.data.id).toEqual(table.id.toString());
    });

    it('should not be able to get a non existing table', async () => {
      const response = await request(httpServer).get(
        `/tables/${UniqueEntityId.create()}`,
      );

      expect(response.statusCode).toBe(500);
    });
  });
});
