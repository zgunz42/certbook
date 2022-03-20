import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserUpdateDto extends PartialType(UserCreateDto) {
  @IsNumberString()
  id: number;
}
