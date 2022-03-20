import { Injectable } from '@nestjs/common';
import { CreateCertDTO } from '@/certificates/dto/create-certificate.dto';
import { UpdateCertificateDto } from '@/certificates/dto/update-certificate.dto';
import { CertificateEntity } from '@/certificates/entities/certificate.entity';
import { CertificateRepository } from '../repository/certificate.repository';
import { UserService } from '@/users/services/users.service';

@Injectable()
export class CertificatesService {
  constructor(
    private readonly userService: UserService,
    private readonly repository: CertificateRepository,
  ) {}

  async create(cert: CreateCertDTO) {
    const certEntity = new CertificateEntity();
    const user = await this.userService.findOne({
      username: cert.signer,
    });
    certEntity.name = cert.name;
    certEntity.description = cert.description;
    certEntity.issueAt = cert.issueAt;
    certEntity.signer = user.signs;
    return this.repository.create(certEntity);
  }

  findAll(): Promise<CertificateEntity[]> {
    return this.repository.findAll();
  }

  findOne(id: number): Promise<CertificateEntity> {
    return this.repository.findOne({ id });
  }

  async update(data: UpdateCertificateDto): Promise<CertificateEntity> {
    const cert = await this.repository.findOne({ id: data.id });
    if (!cert) {
      throw new Error('Certificate not found');
    }
    cert.name = data.name;
    return this.repository.update(cert);
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.repository.delete({ id });
      return true;
    } catch (error) {
      return false;
    }
  }
}
