import { IsOptional, IsNotEmpty, IsDateString, Matches } from 'class-validator';
import { Transform as ClassTransform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Gênero do usuário',
    example: 'male',
    enum: ['male', 'female'],
    required: false,
  })
  @IsOptional()
  gender?: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
    required: false,
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Data de nascimento no formato YYYY-MM-DD',
    example: '1990-05-15',
  })
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: 'birthDate must be a valid date string (YYYY-MM-DD)' },
  )
  birthDate: string;

  @ApiProperty({
    description: 'Local de nascimento',
    example: 'São Paulo, SP',
    required: false,
  })
  @IsOptional()
  placeOfBirth?: string;

  @ApiProperty({
    description: 'Nacionalidade',
    example: 'Brasileira',
    required: false,
  })
  @IsOptional()
  nationality?: string;

  @ApiProperty({
    description: 'CPF do usuário (apenas números, 11 dígitos)',
    example: '12345678901',
  })
  @IsNotEmpty()
  @ClassTransform(({ value }) => value?.replace(/\D/g, ''))
  @Matches(/^\d{11}$/, { message: 'CPF must have 11 numeric digits' })
  cpf: string;
}
