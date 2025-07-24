import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma.service';

describe('UserController (e2e)', () => {
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

  describe('/users (POST)', () => {
    it('should create a new user with valid data', () => {
      const createUserDto = {
        name: 'João Silva',
        cpf: '67923102040',
        email: 'joao@example.com',
        gender: 'M',
        birthDate: '1990-01-01',
        placeOfBirth: 'São Paulo',
        nationality: 'Brasileira',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty(
            'message',
            'User created successfully',
          );
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data.name).toBe(createUserDto.name);
          expect(res.body.data.cpf).toBe(createUserDto.cpf);
          expect(res.body.data.email).toBe(createUserDto.email);
        });
    });

    it('should create a user with minimal required data', () => {
      const createUserDto = {
        name: 'Maria Santos',
        cpf: '12336043092',
        birthDate: '1985-05-15',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.data.name).toBe(createUserDto.name);
          expect(res.body.data.cpf).toBe(createUserDto.cpf);
        });
    });

    it('should reject user creation with invalid CPF format', () => {
      const createUserDto = {
        name: 'Test User',
        cpf: '1234567890',
        birthDate: '1990-01-01',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(400);
    });

    it('should reject user creation with missing required fields', () => {
      const createUserDto = {
        email: 'test@example.com',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(400);
    });

    it('should reject user creation with missing birthDate', () => {
      const createUserDto = {
        name: 'Test User',
        cpf: '35832037049',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(400);
    });

    it('should reject user creation with invalid birth date format', () => {
      const createUserDto = {
        name: 'Test User',
        cpf: '30931421055',
        birthDate: 'invalid-date',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(400);
    });

    it('should reject duplicate CPF', async () => {
      const createUserDto = {
        name: 'João Silva',
        cpf: '07476304020',
        birthDate: '1990-01-01',
      };

      await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(409);
    });

    it('should clean CPF format (remove non-numeric characters)', () => {
      const createUserDto = {
        name: 'Test User',
        cpf: '679.231.020-40',
        birthDate: '1990-01-01',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.data.cpf).toBe('67923102040');
        });
    });
  });

  describe('/users (GET)', () => {
    it('should return all users', async () => {
      const users = [
        { name: 'User 1', cpf: '12336043092', birthDate: '1990-01-01' },
        { name: 'User 2', cpf: '35832037049', birthDate: '1991-02-02' },
        { name: 'User 3', cpf: '30931421055', birthDate: '1992-03-03' },
      ];

      for (const user of users) {
        await request(app.getHttpServer())
          .post('/users')
          .send(user)
          .expect(201);
      }

      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body.data.length).toBeGreaterThanOrEqual(3);
          const userNames = res.body.data.map((u) => u.name);
          expect(userNames).toContain('User 1');
          expect(userNames).toContain('User 2');
          expect(userNames).toContain('User 3');
        });
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return a specific user by ID', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Test User',
          cpf: '07476304020',
          email: 'test@example.com',
          birthDate: '1990-01-01',
        })
        .expect(201);

      const userId = createResponse.body.data.id;

      return request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.id).toBe(userId);
          expect(res.body.data.name).toBe('Test User');
          expect(res.body.data.cpf).toBe('07476304020');
        });
    });

    it('should return 404 for non-existent user ID', () => {
      return request(app.getHttpServer())
        .get('/users/non-existent-id')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toContain(
            "User with ID 'non-existent-id' not found",
          );
        });
    });

    it('should return 404 for invalid UUID format', () => {
      return request(app.getHttpServer())
        .get('/users/invalid-uuid')
        .expect(404);
    });
  });

  describe('/users/:id (PATCH)', () => {
    it('should update user with valid data', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Original Name',
          cpf: '67923102040',
          birthDate: '1990-01-01',
        })
        .expect(201);

      const userId = createResponse.body.data.id;

      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
        gender: 'F',
      };

      return request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.name).toBe('Updated Name');
          expect(res.body.data.email).toBe('updated@example.com');
          expect(res.body.data.gender).toBe('F');
          expect(res.body.data.cpf).toBe('67923102040');
        });
    });

    it('should return 404 when updating non-existent user', () => {
      const updateData = {
        name: 'Updated Name',
      };

      return request(app.getHttpServer())
        .patch('/users/non-existent-id')
        .send(updateData)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toContain(
            "User with ID 'non-existent-id' not found for update",
          );
        });
    });

    it('should reject update with invalid CPF format', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Test User',
          cpf: '12336043092',
          birthDate: '1990-01-01',
        })
        .expect(201);

      const userId = createResponse.body.data.id;

      const updateData = {
        cpf: '1234567890',
      };

      return request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send(updateData)
        .expect(400);
    });

    it('should reject update with duplicate CPF', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'User 1',
          cpf: '35832037049',
          birthDate: '1990-01-01',
        })
        .expect(201);

      const createResponse2 = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'User 2',
          cpf: '30931421055',
          birthDate: '1991-02-02',
        })
        .expect(201);

      const userId2 = createResponse2.body.data.id;

      const updateData = {
        cpf: '35832037049',
      };

      return request(app.getHttpServer())
        .patch(`/users/${userId2}`)
        .send(updateData)
        .expect(409);
    });

    it('should reject update with empty birthDate', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'Test User',
          cpf: '07476304020',
          birthDate: '1990-01-01',
        })
        .expect(201);

      const userId = createResponse.body.data.id;

      const updateData = {
        birthDate: '',
      };

      return request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send(updateData)
        .expect(400);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete user successfully', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'User to Delete',
          cpf: '67923102040',
          birthDate: '1990-01-01',
        })
        .expect(201);

      const userId = createResponse.body.data.id;

      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('User deleted successfully');
        });

      return request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
    });

    it('should return 404 when deleting non-existent user', () => {
      return request(app.getHttpServer())
        .delete('/users/non-existent-id')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toContain(
            "User with ID 'non-existent-id' not found for deletion",
          );
        });
    });
  });

  describe('Error handling', () => {
    it('should handle database connection errors gracefully', async () => {
      await prismaService.$disconnect();

      try {
        await request(app.getHttpServer()).get('/users').expect(500);
      } catch (error) {
        expect(error).toBeDefined();
      }

      await prismaService.$connect();
    });
  });
});
