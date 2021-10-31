import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SchemaModule } from '../src/schema/schema.module';

describe('SchemaController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SchemaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/schema (GET)', () => {
    return request(app.getHttpServer())
      .get('/schema')
      .expect(200)
      .expect({
        data: ['test'],
      });
  });
});
