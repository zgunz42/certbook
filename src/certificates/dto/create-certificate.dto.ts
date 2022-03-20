import { CertificateEntity } from '../entities/certificate.entity';

type ICertificateDTO = {
  file: string;
  signer: string; // user id
  receiver: number; // participant id
  issueAt?: Date;
  serialNumber?: string;
};

export class CreateCertDTO
  implements Override<Creater<CertificateEntity>, ICertificateDTO>
{
  file: string;
  name: string;
  description: string;
  issueAt?: Date;
  signer: string;
  receiver: number;
}
