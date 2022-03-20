import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
