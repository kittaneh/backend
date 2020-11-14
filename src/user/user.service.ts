import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async countAll(): Promise<number> {
    return this.userRepository.count();
  }

  async create(
    firstname: string,
    lastname: string,
    email: string,
  ): Promise<User> {
    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    return this.userRepository.save(user);
  }
}
