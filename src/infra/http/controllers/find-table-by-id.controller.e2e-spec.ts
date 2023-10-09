import { AppModule } from '../../app.module';
import { PrismaTablesMapper } from '../../database/prisma/mappers/prisma-tables.mapper';
import { PrismaService } from '../../database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { makeTable } from '@test/factories/make-table';
import request from 'supertest';

describe('Find Table By Id (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let httpServer;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();

    httpServer = app.getHttpServer();
  });

  describe('[GET] /api/table/id', async () => {
    it('should be able to get a table by id', async () => {
      const table = makeTable();
      await prisma.table.create({
        data: PrismaTablesMapper.toPrisma(table),
      });
      const response = await request(httpServer).get(
        `/table/${table.id.toString()}`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.data.id).toEqual(table.id.toString());
    });
  });
});
