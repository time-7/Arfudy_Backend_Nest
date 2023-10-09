import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import request from 'supertest';
import { makeTable } from '@test/factories/make-table';

describe('Create Table (E2E)', () => {
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
    it('should be able to create a table', async () => {
      const table = makeTable();

      const response = await request(httpServer).post('/tables').send({
        tableNum: table.tableNum,
        seatNum: table.seatNum,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.data.id).toBeTruthy();
      expect(response.body.data.activeToken).toBeTruthy();
    });
  });
});
