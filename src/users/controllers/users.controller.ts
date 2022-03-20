import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from '../dto/user.dto';
import { UserEntity } from '../enitites/user.entity';
import { UserService } from '../services/users.service';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findOne(+id);
  }

  @Post()
  async create(@Body() user: UserCreateDto): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  @Put(':id')
  async update(@Body() user: UserUpdateDto): Promise<UserEntity> {
    return await this.userService.update(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.delete(+id);
  }
}
