import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Gênero do usuário',
    example: 'male',
    enum: ['male', 'female'],
    required: false,
  })
  gender?: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Data de nascimento no formato YYYY-MM-DD',
    example: '1990-05-15',
    required: false,
  })
  birthDate?: string;

  @ApiProperty({
    description: 'Local de nascimento',
    example: 'São Paulo, SP',
    required: false,
  })
  placeOfBirth?: string;

  @ApiProperty({
    description: 'Nacionalidade',
    example: 'Brasileira',
    required: false,
  })
  nationality?: string;

  @ApiProperty({
    description: 'CPF do usuário (apenas números, 11 dígitos)',
    example: '12345678901',
    required: false,
  })
  cpf?: string;
}
