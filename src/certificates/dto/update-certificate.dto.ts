import { PartialType } from '@nestjs/mapped-types';
import { CreateCertDTO } from './create-certificate.dto';

export class UpdateCertificateDto extends PartialType(CreateCertDTO) {
  id: number;
}
