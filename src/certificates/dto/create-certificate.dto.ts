import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Person } from '../entities/owner.entity';
import { CertPropertyDto } from './cert-property.dto';

export class CreateCertificateDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  templateFile: string;

  @IsArray()
  templateData: CertPropertyDto[];

  certificateFile: string;

  @IsDateString()
  issueAt: Date;

  @IsNotEmpty()
  owner: Person;

  @IsNotEmpty()
  receiver: Person;
}
