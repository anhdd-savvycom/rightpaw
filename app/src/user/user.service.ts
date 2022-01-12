import { Injectable } from '@nestjs/common';
import { Prisma } from "@prisma/client";

import { PrismaService } from "@/prisma/prisma.service";
import { UserListDto, UserListResponse } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async list(_args: UserListDto): Promise<UserListResponse> {
    let { state, petExp, name, email, limit, offset } = _args;
    limit = limit || 5;
    offset = offset || 0;

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

    const total = await this.prisma.user.count({where});
    const result = await this.prisma.user.findMany({
      where,
      skip: offset,
      take: limit,
    });

    return {
      items: result.map((item) => {
        const { id, ...attrs } = item;

        return attrs;
      }),
      pagination: {
        perPage: limit,
        totalPage: Math.ceil(total / limit),
        currentPage: Math.ceil(offset / limit) + 1,
      }
    };
  }
}
