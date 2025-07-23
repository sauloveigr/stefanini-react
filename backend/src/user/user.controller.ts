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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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
