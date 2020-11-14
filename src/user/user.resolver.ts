import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import * as Joi from '@hapi/joi';
import { BadRequestException } from '@nestjs/common';

//server validation with Joi
const schema = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
});

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
    const result = schema.validate({
      firstname: firstname,
      lastname: lastname,
      email: email,
    });
    if (result.error) {
      throw new BadRequestException(result.error);
    }
    return await this.userService.create(firstname, lastname, email);
  }
}
