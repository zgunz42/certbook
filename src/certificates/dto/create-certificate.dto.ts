import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PersonEntity } from '../entities/owner.entity';
import { CertPropertyDto } from './cert-property.dto';

export class CreateCertificateDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  templateFile: string;

  // @IsArray()
  @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })
  templateData: CertPropertyDto[];

  certificateFile: string;

  @IsDateString()
  issueAt: Date;

  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  owner: PersonEntity;

  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  receiver: PersonEntity;
}
