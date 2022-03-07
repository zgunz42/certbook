import { IsNumber, IsString } from 'class-validator';

export class CertPropertyDto {
  @IsString()
  name: string;

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}
