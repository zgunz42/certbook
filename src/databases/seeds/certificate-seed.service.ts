import { Inject, Injectable } from '@nestjs/common';
import { CertificatesService } from '@/certificates/services/certificates.service';

@Injectable()
export class CertificateSeed {
  constructor(@Inject() private readonly service: CertificatesService) {}
}
