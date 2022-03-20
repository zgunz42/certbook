import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterUserDto } from '../dto/filter-user.dto';
import { UserCreateDto, UserUpdateDto } from '../dto/user.dto';
import { UserEntity } from '../enitites/user.entity';
import { NotFoundError } from '../exceptions/user-not-found.exception';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  findOne({ email, username }: FilterUserDto): Promise<UserEntity> {
    if (email === undefined && username === undefined) {
      throw new Error('You must provide email or username');
    }
    return this.repository.findOne({
      where: {
        email,
        username,
      },
    });
  }

  async create(createUserDto: UserCreateDto): Promise<UserEntity> {
    const user = this.repository.create({
      ...createUserDto,
    });

    return this.repository.save(user);
  }

  async update(id: number, updateUserDto: UserUpdateDto): Promise<UserEntity> {
    const result = await this.repository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundError('User not found');
    }
    return this.repository.findOne(id);
  }

  async delete(id: number): Promise<UserEntity> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundError('User not found');
    }
    return this.repository.findOne(id);
  }
}
