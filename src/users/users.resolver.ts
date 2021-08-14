import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUserArgs } from './dto/args/get-user.args';
import { CreateUserInputs } from './dto/inputs/create-user.inputs';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return await this.userService.getUsers();
  }
  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  async user(
    @CurrentUser() user: User,
    @Args() userArgs: GetUserArgs,
  ): Promise<User> {
    console.log(user);
    return await this.userService.getUserById(userArgs);
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('newUserData') newUserData: CreateUserInputs,
  ): Promise<User> {
    return await this.userService.createUser(newUserData);
  }
}
