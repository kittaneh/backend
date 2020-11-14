import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User } from './user.model';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'world';
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('firstname') firstname: string,
    @Args('lastname') lastname: string,
    @Args('email') email: string,
  ) {
    return await this.userService.create(firstname, lastname, email);
  }
}
