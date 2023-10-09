import { makeTable } from '@test/factories/make-table';
import request from 'supertest';
import { PrismaTablesMapper } from '../../database/prisma/mappers/prisma-tables.mapper';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('Delete Table (E2E)', () => {
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

  describe('[DELETE] /api/tables/id', () => {
    it('should be able to delete a table', async () => {
      const table = makeTable();
      const data = PrismaTablesMapper.toPrisma(table);
      await prisma.table.create({ data });

      const response = await request(httpServer).delete(
        `/tables/${table.id.toString()}`,
      );

      expect(response.statusCode).toBe(200);
    });

    it('should not be able to delete a non existing table', async () => {
      const id = UniqueEntityId.createFromInt(10);

      const response = await request(httpServer).delete(`/tables/${id}`);

      expect(response.statusCode).toBe(500);
    });
  });
});
