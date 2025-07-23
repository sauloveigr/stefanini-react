import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  describe('validation', () => {
    it('should pass validation with valid data', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.gender = 'male';
      dto.email = 'joao@example.com';
      dto.birthDate = '1990-01-01';
      dto.placeOfBirth = 'São Paulo';
      dto.nationality = 'Brasileira';
      dto.cpf = '12345678901';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation without optional fields', async () => {
      const dto = new CreateUserDto();
      dto.name = 'Maria Silva';
      dto.gender = 'female';
      dto.birthDate = '1995-05-15';
      dto.cpf = '98765432100';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation when name is missing', async () => {
      const dto = new CreateUserDto();
      dto.gender = 'male';
      dto.birthDate = '1990-01-01';
      dto.cpf = '12345678901';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('name');
    });

    it('should fail validation when CPF is missing', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.gender = 'male';
      dto.birthDate = '1990-01-01';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('cpf');
    });

    it('should fail validation when CPF has invalid format', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.gender = 'male';
      dto.birthDate = '1990-01-01';
      dto.cpf = '1234567890'; // Less than 11 digits

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('cpf');
    });

    it('should pass validation when email is empty string', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.gender = 'male';
      dto.birthDate = '1990-01-01';
      dto.cpf = '12345678901';
      dto.email = '';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation when email has invalid format (since email is optional without validation)', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.gender = 'male';
      dto.birthDate = '1990-01-01';
      dto.cpf = '12345678901';
      dto.email = 'invalid-email';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation when birthDate has invalid format', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.gender = 'male';
      dto.birthDate = 'invalid-date';
      dto.cpf = '12345678901';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('birthDate');
    });
  });
});
