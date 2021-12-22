import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { UsersService } from './Users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  insertUser(@Body() userDetails: CreateUserDTO) {
    const user = this.usersService.insertUser(userDetails);

    return user;
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Patch(':id')
  updateUser(
    @Body() userUpdateDetails: UpdateUserDTO,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.usersService.updateUser(userId, userUpdateDetails);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
