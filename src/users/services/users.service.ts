import { Injectable } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from '../dto/user.dto';
import { UserEntity } from '../enitites/user.entity';
import {
  NotFoundError,
  UserNotFoundException,
} from '../exceptions/user-not-found.exception';
import { UserRepository } from '../repository/users.repository';
import bycript from 'bcrypt';

@Injectable()
export class UserService {
  private readonly saltCount = 10;
  constructor(private readonly repository: UserRepository) {}

  findAll(): Promise<UserEntity[]> {
    return this.repository.findAll();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.repository.findOne(id);
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
