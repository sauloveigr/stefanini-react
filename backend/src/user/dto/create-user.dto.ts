import { IsOptional, IsNotEmpty, IsDateString, Matches } from 'class-validator';
import { Transform as ClassTransform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  gender?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'birthDate must be a valid date string (YYYY-MM-DD)' },
  )
  birthDate?: string;

  @IsOptional()
  placeOfBirth?: string;

  @IsOptional()
  nationality?: string;

  @IsNotEmpty()
  @ClassTransform(({ value }) => value?.replace(/\D/g, ''))
  @Matches(/^\d{11}$/, { message: 'CPF must have 11 numeric digits' })
  cpf: string;
}
