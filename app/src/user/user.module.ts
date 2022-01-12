import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { UsersResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UsersResolver]
})
export class UserModule {}
