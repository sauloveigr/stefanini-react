import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';

describe('UserModule', () => {
  let module: TestingModule;
  let controller: UserController;
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have UserController defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have UserService defined', () => {
    expect(service).toBeDefined();
  });

  it('should have PrismaService defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should have all dependencies injected correctly', () => {
    expect(controller).toBeInstanceOf(UserController);
    expect(service).toBeInstanceOf(UserService);
    expect(prismaService).toBeDefined();
  });
});
