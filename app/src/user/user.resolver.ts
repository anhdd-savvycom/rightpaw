import { Args, Query, Resolver } from "@nestjs/graphql";

import { UserService } from "./user.service";

@Resolver('users')
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query()
  async users(@Args() _args) {
    _args = _args || {};

    return this.userService.list(_args);
  }
}
