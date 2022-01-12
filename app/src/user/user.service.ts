import { Injectable } from '@nestjs/common';
import { Prisma } from "@prisma/client";

import { PrismaService } from "@/prisma/prisma.service";
import { UserListDto, UserListResponseItem } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async list(_args: UserListDto): Promise<UserListResponseItem[]> {
    const { state, petExp, name, email, limit, offset } = _args;

    let where: Prisma.UserWhereInput = {};
    if (state) {
      where.state = state;
    }
    if (petExp) {
      where.petExp = petExp;
    }
    if (name) {
      where.OR = [
        {lastName: {contains: name, mode: 'insensitive'}},
        {firstName: {contains: name, mode: 'insensitive'}},
      ];
    }
    if (email) {
      where.email = email;
    }

    const result = await this.prisma.user.findMany({
      where,
      skip: offset || 0,
      take: limit || 5,
    });

    return result.map((item) => {
      const { id, ...attrs } = item;

      return attrs;
    });
  }
}
