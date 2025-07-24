import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async create(data: CreateUserDto) {
    try {
      const userData: any = { ...data };

      // birthDate é obrigatório, sempre processar
      if (data.birthDate && data.birthDate.trim() !== '') {
        const [year, month, day] = data.birthDate.split('-').map(Number);
        userData.birthDate = new Date(year, month - 1, day);
      } else {
        throw new BadRequestException('birthDate is required');
      }

      // Tratar email
      if (userData.email && userData.email.trim() !== '') {
        if (!this.validateEmail(userData.email.trim())) {
          throw new BadRequestException('Email deve ser um email válido');
        }
        userData.email = userData.email.trim();
      } else {
        delete userData.email;
      }

      // Tratar placeOfBirth
      if (!userData.placeOfBirth || userData.placeOfBirth.trim() === '') {
        delete userData.placeOfBirth;
      } else {
        userData.placeOfBirth = userData.placeOfBirth.trim();
      }

      // Tratar nationality
      if (!userData.nationality || userData.nationality.trim() === '') {
        delete userData.nationality;
      } else {
        userData.nationality = userData.nationality.trim();
      }

      // Tratar gender
      if (!userData.gender || userData.gender.trim() === '') {
        delete userData.gender;
      } else {
        userData.gender = userData.gender.trim();
      }

      return await this.prisma.user.create({ data: userData });
    } catch (error) {
      console.error('Create user error:', error);
      if (error.code === 'P2002') {
        throw new Error('User with this CPF already exists');
      }
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Find all users error:', error);
      throw new Error('Failed to fetch users');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error('Find one user error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to fetch user');
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const updateData: any = { ...data };

      // Tratar birthDate (opcional na atualização)
      if (data.birthDate !== undefined) {
        if (data.birthDate && data.birthDate.trim() !== '') {
          const [year, month, day] = data.birthDate.split('-').map(Number);
          updateData.birthDate = new Date(year, month - 1, day);
        } else {
          throw new BadRequestException('birthDate cannot be empty');
        }
      }

      // Tratar email
      if (updateData.email !== undefined) {
        if (updateData.email && updateData.email.trim() !== '') {
          if (!this.validateEmail(updateData.email.trim())) {
            throw new BadRequestException('Email deve ser um email válido');
          }
          updateData.email = updateData.email.trim();
        } else {
          updateData.email = null;
        }
      }

      // Tratar placeOfBirth
      if (updateData.placeOfBirth !== undefined) {
        updateData.placeOfBirth =
          updateData.placeOfBirth && updateData.placeOfBirth.trim() !== ''
            ? updateData.placeOfBirth.trim()
            : null;
      }

      // Tratar nationality
      if (updateData.nationality !== undefined) {
        updateData.nationality =
          updateData.nationality && updateData.nationality.trim() !== ''
            ? updateData.nationality.trim()
            : null;
      }

      // Tratar gender
      if (updateData.gender !== undefined) {
        updateData.gender =
          updateData.gender && updateData.gender.trim() !== ''
            ? updateData.gender.trim()
            : null;
      }

      // Verificar CPF duplicado
      if (updateData.cpf) {
        const existingUserWithCpf = await this.prisma.user.findFirst({
          where: {
            cpf: updateData.cpf,
            id: { not: id },
          },
        });
        if (existingUserWithCpf) {
          throw new Error('User with this CPF already exists');
        }
      }

      return await this.prisma.user.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      console.error('Update user error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error.message.includes('already exists')) {
        throw new Error(`User update failed: ${error.message}`);
      }
      if (error.code === 'P2002') {
        throw new Error('User with this CPF already exists');
      }
      if (error.code === 'P2025') {
        throw new Error('Record to update not found');
      }
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Remove user error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to delete user');
    }
  }
}
