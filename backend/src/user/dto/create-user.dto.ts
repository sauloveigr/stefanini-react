import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsDateString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsOptional()
  placeOfBirth?: string; // naturalidade em inglês

  @IsOptional()
  nationality?: string; // nacionalidade em inglês

  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'CPF must have 11 numeric digits' })
  cpf: string;
}
