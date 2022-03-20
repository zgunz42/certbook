import { Injectable } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from '../dto/user.dto';
import { UserEntity } from '../enitites/user.entity';
import {
  NotFoundError,
  UserNotFoundException,
} from '../exceptions/user-not-found.exception';
import { UserRepository } from '../repository/users.repository';
import bycript from 'bcrypt';
import { FilterUserDto } from '../dto/filter-user.dto';

@Injectable()
export class UserService {
  private readonly saltCount = 10;
  constructor(private readonly repository: UserRepository) {}

  findAll(): Promise<UserEntity[]> {
    return this.repository.findAll();
  }

  findOne(filter: FilterUserDto): Promise<UserEntity> {
    return this.repository.findOne(filter);
  }

  async findByCredential(
    filter: FilterUserDto,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.repository.findOne(filter);
    if (!user) {
      throw new UserNotFoundException();
    }
    const isValidPass = await this.comparePassword(password, user.password);
    if (isValidPass === true) {
      return user;
    }

    throw new UserNotFoundException();
  }

  private comparePassword(password: string, hashedPassword: string) {
    return bycript.compare(password, hashedPassword);
  }

  private saltPassword(password: string) {
    return bycript.hash(password, this.saltCount);
  }

  async update(updateUserDto: UserUpdateDto): Promise<UserEntity> {
    try {
      return this.repository.update(updateUserDto.id, updateUserDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UserNotFoundException();
      }

      throw error;
    }
  }

  async create(createUserDto: UserCreateDto): Promise<UserEntity> {
    // hash password
    const hashedPassword = await this.saltPassword(createUserDto.password);
    return this.repository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async delete(id: number): Promise<UserEntity> {
    try {
      return this.repository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UserNotFoundException();
      }

      throw error;
    }
  }
}
