import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
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

      mockUserService.create.mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);

      expect(result).toEqual({
        data: expectedUser,
        message: 'User created successfully',
      });
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should handle CPF uniqueness constraint error', async () => {
      const error = new Error('User with this CPF already exists');
      mockUserService.create.mockRejectedValue(error);

      await expect(controller.create(createUserDto)).rejects.toThrow(
        new HttpException(
          'User creation failed: User with this CPF already exists',
          HttpStatus.CONFLICT,
        ),
      );
    });

    it('should handle other errors', async () => {
      const error = new Error('Database connection failed');
      mockUserService.create.mockRejectedValue(error);

      await expect(controller.create(createUserDto)).rejects.toThrow(
        new HttpException(
          'User creation failed: Database connection failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    it('should handle unknown errors', async () => {
      const error = { message: 'Unknown error' };
      mockUserService.create.mockRejectedValue(error);

      await expect(controller.create(createUserDto)).rejects.toThrow(
        new HttpException(
          'User creation failed: Unknown error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
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

      mockUserService.findAll.mockResolvedValue(expectedUsers);

      const result = await controller.findAll();

      expect(result).toEqual({
        data: expectedUsers,
        message: 'Users retrieved successfully',
      });
      expect(userService.findAll).toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      mockUserService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(
        new HttpException(
          'Failed to fetch users: Database connection failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    it('should handle unknown errors', async () => {
      const error = { message: 'Unknown error' };
      mockUserService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(
        new HttpException(
          'Failed to fetch users: Unknown error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
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

      mockUserService.findOne.mockResolvedValue(expectedUser);

      const result = await controller.findOne(userId);

      expect(result).toEqual({
        data: expectedUser,
        message: 'User retrieved successfully',
      });
      expect(userService.findOne).toHaveBeenCalledWith(userId);
    });

    it('should handle user not found error', async () => {
      const error = new Error('User not found') as any;
      error.status = HttpStatus.NOT_FOUND;
      mockUserService.findOne.mockRejectedValue(error);

      await expect(controller.findOne(userId)).rejects.toThrow(
        new HttpException(
          `User with ID '${userId}' not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should handle other errors', async () => {
      const error = new Error('Database connection failed');
      mockUserService.findOne.mockRejectedValue(error);

      await expect(controller.findOne(userId)).rejects.toThrow(
        new HttpException(
          `Failed to fetch user with ID '${userId}': Database connection failed`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    it('should handle unknown errors', async () => {
      const error = { message: 'Unknown error' };
      mockUserService.findOne.mockRejectedValue(error);

      await expect(controller.findOne(userId)).rejects.toThrow(
        new HttpException(
          `Failed to fetch user with ID '${userId}': Unknown error`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
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
      const updatedUser = {
        id: userId,
        name: 'João Silva Updated',
        gender: 'male',
        email: 'joao.updated@example.com',
        birthDate: new Date('1990-01-01'),
        placeOfBirth: 'São Paulo',
        nationality: 'Brasileira',
        cpf: '12345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserService.update.mockResolvedValue(updatedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(result).toEqual({
        data: updatedUser,
        message: 'User updated successfully',
      });
      expect(userService.update).toHaveBeenCalledWith(userId, updateUserDto);
    });

    it('should handle user not found error', async () => {
      const error = new Error('User not found') as any;
      error.status = HttpStatus.NOT_FOUND;
      mockUserService.update.mockRejectedValue(error);

      await expect(controller.update(userId, updateUserDto)).rejects.toThrow(
        new HttpException(
          `User with ID '${userId}' not found for update`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should handle CPF uniqueness constraint error', async () => {
      const error = new Error('User with this CPF already exists');
      mockUserService.update.mockRejectedValue(error);

      await expect(controller.update(userId, updateUserDto)).rejects.toThrow(
        new HttpException(
          'User update failed: User with this CPF already exists',
          HttpStatus.CONFLICT,
        ),
      );
    });

    it('should handle other errors', async () => {
      const error = new Error('Database connection failed');
      mockUserService.update.mockRejectedValue(error);

      await expect(controller.update(userId, updateUserDto)).rejects.toThrow(
        new HttpException(
          `Failed to update user with ID '${userId}': Database connection failed`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    it('should handle unknown errors', async () => {
      const error = { message: 'Unknown error' };
      mockUserService.update.mockRejectedValue(error);

      await expect(controller.update(userId, updateUserDto)).rejects.toThrow(
        new HttpException(
          `Failed to update user with ID '${userId}': Unknown error`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('remove', () => {
    const userId = '1';

    it('should delete a user successfully', async () => {
      mockUserService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(userId);

      expect(result).toEqual({
        message: 'User deleted successfully',
      });
      expect(userService.remove).toHaveBeenCalledWith(userId);
    });

    it('should handle user not found error', async () => {
      const error = new Error('User not found') as any;
      error.status = HttpStatus.NOT_FOUND;
      mockUserService.remove.mockRejectedValue(error);

      await expect(controller.remove(userId)).rejects.toThrow(
        new HttpException(
          `User with ID '${userId}' not found for deletion`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should handle other errors', async () => {
      const error = new Error('Database connection failed');
      mockUserService.remove.mockRejectedValue(error);

      await expect(controller.remove(userId)).rejects.toThrow(
        new HttpException(
          `Failed to delete user with ID '${userId}': Database connection failed`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    it('should handle unknown errors', async () => {
      const error = { message: 'Unknown error' };
      mockUserService.remove.mockRejectedValue(error);

      await expect(controller.remove(userId)).rejects.toThrow(
        new HttpException(
          `Failed to delete user with ID '${userId}': Unknown error`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
