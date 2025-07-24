import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the provided information',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao.silva@email.com' },
            gender: { type: 'string', example: 'male' },
            birthDate: { type: 'string', example: '1990-05-15' },
            placeOfBirth: { type: 'string', example: 'São Paulo, SP' },
            nationality: { type: 'string', example: 'Brasileira' },
            cpf: { type: 'string', example: '12345678901' },
            createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
          },
        },
        message: { type: 'string', example: 'User created successfully' },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'User with this CPF already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return { data: user, message: 'User created successfully' };
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw new HttpException(
          `User creation failed: ${error.message}`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        `User creation failed: ${error.message || 'Unknown error occurred'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all users',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '1' },
              name: { type: 'string', example: 'João Silva' },
              email: { type: 'string', example: 'joao.silva@email.com' },
              gender: { type: 'string', example: 'male' },
              birthDate: { type: 'string', example: '1990-05-15' },
              placeOfBirth: { type: 'string', example: 'São Paulo, SP' },
              nationality: { type: 'string', example: 'Brasileira' },
              cpf: { type: 'string', example: '12345678901' },
              createdAt: {
                type: 'string',
                example: '2024-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2024-01-01T00:00:00.000Z',
              },
            },
          },
        },
        message: { type: 'string', example: 'Users retrieved successfully' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return { data: users, message: 'Users retrieved successfully' };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch users: ${error.message || 'Unknown error occurred'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a specific user by their ID',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao.silva@email.com' },
            gender: { type: 'string', example: 'male' },
            birthDate: { type: 'string', example: '1990-05-15' },
            placeOfBirth: { type: 'string', example: 'São Paulo, SP' },
            nationality: { type: 'string', example: 'Brasileira' },
            cpf: { type: 'string', example: '12345678901' },
            createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
          },
        },
        message: { type: 'string', example: 'User retrieved successfully' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return { data: user, message: 'User retrieved successfully' };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          `User with ID '${id}' not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        `Failed to fetch user with ID '${id}': ${error.message || 'Unknown error occurred'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user',
    description: 'Updates an existing user with the provided information',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao.silva@email.com' },
            gender: { type: 'string', example: 'male' },
            birthDate: { type: 'string', example: '1990-05-15' },
            placeOfBirth: { type: 'string', example: 'São Paulo, SP' },
            nationality: { type: 'string', example: 'Brasileira' },
            cpf: { type: 'string', example: '12345678901' },
            createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
          },
        },
        message: { type: 'string', example: 'User updated successfully' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'User with this CPF already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return { data: user, message: 'User updated successfully' };
    } catch (error) {
      console.error('Controller update error:', error);
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          `User with ID '${id}' not found for update`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (error.message.includes('already exists')) {
        throw new HttpException(
          `User update failed: ${error.message}`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        `Failed to update user with ID '${id}': ${error.message || 'Unknown error occurred'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes a user by their ID',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User deleted successfully' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          `User with ID '${id}' not found for deletion`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        `Failed to delete user with ID '${id}': ${error.message || 'Unknown error occurred'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
