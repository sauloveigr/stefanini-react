import { PrismaService } from '../../src/prisma.service';

export async function setupTestDatabase(prismaService: PrismaService) {
  await prismaService.user.deleteMany();
}

export async function teardownTestDatabase(prismaService: PrismaService) {
  await prismaService.user.deleteMany();
  await prismaService.$disconnect();
}

export const testUserData = {
  valid: {
    name: 'João Silva',
    cpf: '67923102040',
    email: 'joao@example.com',
    gender: 'M',
    birthDate: '1990-01-01',
    placeOfBirth: 'São Paulo',
    nationality: 'Brasileira',
  },
  minimal: {
    name: 'Maria Santos',
    cpf: '12336043092',
    birthDate: '1985-05-15',
  },
  invalid: {
    name: 'Test User',
    cpf: '1234567890',
    birthDate: '1990-01-01',
  },
  duplicate: {
    name: 'Duplicate User',
    cpf: '67923102040',
    birthDate: '1990-01-01',
  },
};

export const generateTestUsers = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    name: `Test User ${index + 1}`,
    cpf: `3583203704${index + 1}`,
    email: `user${index + 1}@example.com`,
    birthDate: `199${index}-0${index + 1}-0${index + 1}`,
  }));
};
