import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      name: 'João Silva',
      gender: 'male',
      email: 'joao@example.com',
      birthDate: '1990-01-01',
      placeOfBirth: 'São Paulo',
      nationality: 'Brasileira',
      cpf: '12345678901',
    };

    it('should create a user successfully', async () => {
      const expectedUser = {
        id: '1',
        ...createUserDto,
        birthDate: new Date('1990-01-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.create.mockResolvedValue(expectedUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(expectedUser);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          birthDate: expect.any(Date),
          email: 'joao@example.com',
          placeOfBirth: 'São Paulo',
          nationality: 'Brasileira',
        },
      });
    });

    it('should create a user without optional fields', async () => {
      const userWithoutOptionals: CreateUserDto = {
        name: 'Maria Silva',
        gender: 'female',
        birthDate: '1995-05-15',
        cpf: '98765432100',
      };

      const expectedUser = {
        id: '2',
        ...userWithoutOptionals,
        birthDate: new Date('1995-05-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.create.mockResolvedValue(expectedUser);

      const result = await service.create(userWithoutOptionals);

      expect(result).toEqual(expectedUser);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...userWithoutOptionals,
          birthDate: expect.any(Date),
        },
      });
    });

    it('should handle CPF uniqueness constraint error', async () => {
      const error = new Error('Unique constraint failed') as any;
      error.code = 'P2002';
      mockPrismaService.user.create.mockRejectedValue(error);

      await expect(service.create(createUserDto)).rejects.toThrow(
        'User with this CPF already exists',
      );
    });

    it('should handle other database errors', async () => {
      const error = new Error('Database connection failed');
      mockPrismaService.user.create.mockRejectedValue(error);

      await expect(service.create(createUserDto)).rejects.toThrow(
        'Database connection failed',
      );
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedUsers = [
        {
          id: '1',
          name: 'João Silva',
          gender: 'male',
          email: 'joao@example.com',
          birthDate: new Date('1990-01-01'),
          placeOfBirth: 'São Paulo',
          nationality: 'Brasileira',
          cpf: '12345678901',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Maria Silva',
          gender: 'female',
          email: 'maria@example.com',
          birthDate: new Date('1995-05-15'),
          placeOfBirth: 'Rio de Janeiro',
          nationality: 'Brasileira',
          cpf: '98765432100',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.user.findMany.mockResolvedValue(expectedUsers);

      const result = await service.findAll();

      expect(result).toEqual(expectedUsers);
      expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      mockPrismaService.user.findMany.mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow('Failed to fetch users');
    });
  });

  describe('findOne', () => {
    const userId = '1';

    it('should return a user by id', async () => {
      const expectedUser = {
        id: userId,
        name: 'João Silva',
        gender: 'male',
        email: 'joao@example.com',
        birthDate: new Date('1990-01-01'),
        placeOfBirth: 'São Paulo',
        nationality: 'Brasileira',
        cpf: '12345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(expectedUser);

      const result = await service.findOne(userId);

      expect(result).toEqual(expectedUser);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(userId)).rejects.toThrow(
        new NotFoundException(`User with ID ${userId} not found`),
      );
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      mockPrismaService.user.findUnique.mockRejectedValue(error);

      await expect(service.findOne(userId)).rejects.toThrow(
        'Failed to fetch user',
      );
    });
  });

  describe('update', () => {
    const userId = '1';
    const updateUserDto: UpdateUserDto = {
      name: 'João Silva Updated',
      email: 'joao.updated@example.com',
      birthDate: '1990-01-01',
    };

    it('should update a user successfully', async () => {
      const existingUser = {
        id: userId,
        name: 'João Silva',
        gender: 'male',
        email: 'joao@example.com',
        birthDate: new Date('1990-01-01'),
        placeOfBirth: 'São Paulo',
        nationality: 'Brasileira',
        cpf: '12345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedUser = {
        ...existingUser,
        name: 'João Silva Updated',
        email: 'joao.updated@example.com',
        birthDate: new Date('1990-01-01'),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(userId, updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          ...updateUserDto,
          birthDate: expect.any(Date),
          email: 'joao.updated@example.com',
        },
      });
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.update(userId, updateUserDto)).rejects.toThrow(
        new NotFoundException(`User with ID ${userId} not found`),
      );
    });

    it('should handle CPF uniqueness constraint error', async () => {
      const existingUser = {
        id: userId,
        name: 'João Silva',
        cpf: '12345678901',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.user.findFirst.mockResolvedValue({
        id: '2',
        cpf: '12345678901',
      });

      await expect(
        service.update(userId, { cpf: '12345678901' }),
      ).rejects.toThrow('User with this CPF already exists');
    });

    it('should handle empty email field', async () => {
      const existingUser = {
        id: userId,
        name: 'João Silva',
        email: 'joao@example.com',
      };

      const updateDto = {
        email: '',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      mockPrismaService.user.update.mockResolvedValue({
        ...existingUser,
        email: null,
      });

      const result = await service.update(userId, updateDto);

      expect(result.email).toBeNull();
    });

    it('should handle database errors', async () => {
      const existingUser = {
        id: userId,
        name: 'João Silva',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      mockPrismaService.user.update.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(service.update(userId, updateUserDto)).rejects.toThrow(
        'Failed to update user: Database error',
      );
    });
  });

  describe('remove', () => {
    const userId = '1';

    it('should delete a user successfully', async () => {
      const existingUser = {
        id: userId,
        name: 'João Silva',
        gender: 'male',
        email: 'joao@example.com',
        birthDate: new Date('1990-01-01'),
        placeOfBirth: 'São Paulo',
        nationality: 'Brasileira',
        cpf: '12345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.user.delete.mockResolvedValue(existingUser);

      const result = await service.remove(userId);

      expect(result).toEqual(existingUser);
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.remove(userId)).rejects.toThrow(
        new NotFoundException(`User with ID ${userId} not found`),
      );
    });

    it('should handle database errors', async () => {
      const existingUser = {
        id: userId,
        name: 'João Silva',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.user.delete.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(service.remove(userId)).rejects.toThrow(
        'Failed to delete user',
      );
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
      ];

      validEmails.forEach((email) => {
        expect(service['validateEmail'](email)).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user@.com',
        'user name@example.com',
      ];

      invalidEmails.forEach((email) => {
        expect(service['validateEmail'](email)).toBe(false);
      });
    });
  });
});
