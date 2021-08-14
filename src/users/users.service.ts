import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserArgs } from './dto/args/get-user.args';
import { CreateUserInputs } from './dto/inputs/create-user.inputs';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getUserById(userArgs: GetUserArgs): Promise<User> {
    return await this.userRepository
      .findOne({ userId: userArgs.userId })
      .catch((err) => {
        throw new NotFoundException();
      });
  }

  public async createUser(userInputs: CreateUserInputs) {
    const newUser = this.userRepository.create(userInputs);
    return await this.userRepository.save(newUser);
  }
  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  public async getUserByUserName(username: string) {
    return await this.userRepository.findOne({ username: username });
  }
}
