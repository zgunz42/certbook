import { IsEmail, IsString } from 'class-validator';

export class PersonDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
