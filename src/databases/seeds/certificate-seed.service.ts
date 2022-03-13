import { Inject, Injectable } from '@nestjs/common';
import { CertificatesService } from '@/certificates/services/certificates.service';

@Injectable()
export class CertificateSeed {
  constructor(@Inject() private readonly service: CertificatesService) {}

  public async seed() {
    const certificate = await this.service.create({
      name: 'Certificado de Prueba',
      description: 'Certificado de Prueba',
      templateFile: '',
      templateData: [
        {
          name: 'Nombre',
          x: 0,
          y: 0,
        },
      ],
      certificateFile: '',
      issueAt: new Date(),
      owner: {
        name: 'Juan Perez',
        email: 'juan@mail.com',
      },

      receiver: {
        name: 'Juan Perez',
        email: 'perez@mail.com',
      },
    });
  }
}
