import { Test, TestingModule } from '@nestjs/testing';
import { PetExp } from '@prisma/client';

import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';

import { UserService } from './user.service';

const data = [
  {
    "uuid": "5e9d1112-6a14-436c-80a0-86d90f832b16",
    "firstName": "Charlie",
    "lastName": "Brown",
    "email": "charliebrown@mailinator.com",
    "state": "VIC",
    "petExp": PetExp.Y,
  },
  {
    "uuid": "5ed74fc6-d9e3-4484-8901-daedc59136cd",
    "firstName": "Cruella",
    "lastName": "de Vil",
    "email": "cruella@mailinator.com",
    "state": "NSW",
    "petExp": PetExp.N,
  },
];

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
		prisma = module.get<PrismaService>(PrismaService);
    prisma.user.findMany = jest.fn().mockReturnValueOnce(data);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all users with correct data transform', async () => {
    const users = await service.list({})

		expect(users).toHaveLength(2);
    expect(users[0].uuid).toEqual('5e9d1112-6a14-436c-80a0-86d90f832b16')
    expect(users[1].uuid).toEqual('5ed74fc6-d9e3-4484-8901-daedc59136cd')
	});
});
