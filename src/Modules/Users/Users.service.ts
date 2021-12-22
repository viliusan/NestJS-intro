import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { User } from './User.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  insertUser(userDetails: CreateUserDTO) {
    const user = this.usersRepository.create(userDetails);

    return this.usersRepository.save(user);
  }

  getAllUsers() {
    return this.usersRepository.find();
  }

  getUserById(id: number) {
    return this.findUser(id);
  }

  deleteUser(id: string) {
    return this.usersRepository.delete(id);
  }

  async updateUser(id: number, updateUserDetails: UpdateUserDTO) {
    const user = await this.findUser(id);
    const updatedUser = { ...user, ...updateUserDetails };

    return this.usersRepository.save(updatedUser);
  }

  private async findUser(id: number) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`Could not find user with id ${id}`);
    }

    return user;
  }
}
