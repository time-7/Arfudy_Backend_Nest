import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Test } from '@nestjs/testing';
import { makeTable } from '@test/factories/make-table';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { AppModule } from '../../app.module';
import { PrismaTablesMapper } from '../../database/prisma/mappers/prisma-tables.mapper';
import { PrismaService } from '../../database/prisma/prisma.service';
import request from 'supertest';

describe('Edit Table (E2E)', () => {
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

  describe('[PATCH] /api/tables', () => {
    it('should be able to edit an existing table', async () => {
      const table = makeTable();
      const data = PrismaTablesMapper.toPrisma(table);

      await prisma.table.create({ data });

      const response = await request(httpServer)
        .patch(`/tables/${table.id.toString()}`)
        .send({ tableNum: 10 });

      expect(response.statusCode).toBe(200);
    });

    it('should not be able to edit a non existing table', async () => {
      const response = await request(httpServer)
        .patch(`/tables/${UniqueEntityId.create()}`)
        .send({ tableNum: 1 });

      expect(response.statusCode).toBe(500);
    });
  });
});
