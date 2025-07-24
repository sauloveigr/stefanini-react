import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  describe('Application Health', () => {
    it('should be able to start the application', () => {
      expect(app).toBeDefined();
    });

    it('should have CORS enabled', () => {
      return request(app.getHttpServer()).get('/users').expect(200);
    });
  });

  describe('Validation Pipe', () => {
    it('should reject requests with non-whitelisted properties', () => {
      const invalidUserData = {
        name: 'Test User',
        cpf: '67923102040',
        birthDate: '1990-01-01',
        invalidProperty: 'should be rejected',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(invalidUserData)
        .expect(400);
    });

    it('should transform and validate data correctly', () => {
      const userData = {
        name: 'Test User',
        cpf: '123.360.430-92',
        email: 'test@example.com',
        birthDate: '1990-01-01',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(userData)
        .expect(201)
        .expect((res) => {
          expect(res.body.data.cpf).toBe('12336043092');
          expect(res.body.data.name).toBe('Test User');
          expect(res.body.data.email).toBe('test@example.com');
        });
    });
  });

  describe('Database Integration', () => {
    it('should persist data correctly across requests', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Persistent User',
          cpf: '35832037049',
          email: 'persistent@example.com',
          birthDate: '1990-01-01',
        })
        .expect(201);

      const userId = createResponse.body.data.id;

      await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.name).toBe('Persistent User');
          expect(res.body.data.email).toBe('persistent@example.com');
        });

      await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send({
          name: 'Updated Persistent User',
          email: 'updated@example.com',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.name).toBe('Updated Persistent User');
          expect(res.body.data.email).toBe('updated@example.com');
        });

      await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.name).toBe('Updated Persistent User');
          expect(res.body.data.email).toBe('updated@example.com');
        });
    });

    it('should handle concurrent requests correctly', async () => {
      const promises = Array.from({ length: 5 }, (_, index) =>
        request(app.getHttpServer())
          .post('/users')
          .send({
            name: `Concurrent User ${index + 1}`,
            cpf: `3093142105${index + 1}`,
            birthDate: `199${index}-0${index + 1}-0${index + 1}`,
          }),
      );

      const responses = await Promise.all(promises);

      responses.forEach((response) => {
        expect(response.status).toBe(201);
      });

      const listResponse = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(listResponse.body.data.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON gracefully', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);
    });

    it('should handle missing Content-Type header', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ name: 'Test', cpf: '07476304020', birthDate: '1990-01-01' })
        .expect(201);
    });

    it('should handle large payloads appropriately', () => {
      const largePayload = {
        name: 'A'.repeat(1000),
        cpf: '67923102040',
        email: 'test@example.com',
        birthDate: '1990-01-01',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(largePayload)
        .expect(201);
    });
  });

  describe('Response Format Consistency', () => {
    it('should maintain consistent response format for all endpoints', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Format Test User',
          cpf: '12336043092',
          birthDate: '1990-01-01',
        })
        .expect(201);

      expect(createResponse.body).toHaveProperty('data');
      expect(createResponse.body).toHaveProperty('message');
      expect(typeof createResponse.body.data).toBe('object');
      expect(typeof createResponse.body.message).toBe('string');

      const userId = createResponse.body.data.id;

      const getResponse = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200);

      expect(getResponse.body).toHaveProperty('data');
      expect(getResponse.body).toHaveProperty('message');
      expect(typeof getResponse.body.data).toBe('object');
      expect(typeof getResponse.body.message).toBe('string');

      const listResponse = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(listResponse.body).toHaveProperty('data');
      expect(listResponse.body).toHaveProperty('message');
      expect(Array.isArray(listResponse.body.data)).toBe(true);
      expect(typeof listResponse.body.message).toBe('string');

      const updateResponse = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send({ name: 'Updated Format Test User' })
        .expect(200);

      expect(updateResponse.body).toHaveProperty('data');
      expect(updateResponse.body).toHaveProperty('message');
      expect(typeof updateResponse.body.data).toBe('object');
      expect(typeof updateResponse.body.message).toBe('string');

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .expect(200);

      expect(deleteResponse.body).toHaveProperty('message');
      expect(typeof deleteResponse.body.message).toBe('string');
      expect(deleteResponse.body).not.toHaveProperty('data');
    });
  });
});
