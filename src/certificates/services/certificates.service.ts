import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCertificateDto } from '@/certificates/dto/create-certificate.dto';
import { UpdateCertificateDto } from '@/certificates/dto/update-certificate.dto';
import { CertificateEntity } from '@/certificates/entities/certificate.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(CertificateEntity)
    private readonly repository: Repository<CertificateEntity>,
  ) {}

  create(createCertificateDto: CreateCertificateDto) {
    const certificate = this.repository.create({
      ...createCertificateDto,
      templateData: {
        data: createCertificateDto.templateData.map((it) => ({
          name: 'full_name',
          value: it.name,
          position: {
            x: it.x,
            y: it.y,
          },
        })),
      },
    });

    return this.repository.save(certificate);
  }

  findAll(): Promise<CertificateEntity[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<CertificateEntity> {
    return this.repository.findOne(id);
  }

  async update(
    id: number,
    updateCertificateDto: UpdateCertificateDto,
  ): Promise<CertificateEntity> {
    const result = await this.repository.update(id, {
      ...updateCertificateDto,
      templateData: {
        data: updateCertificateDto.templateData.map((it) => ({
          name: 'full_name',
          value: it.name,
          position: {
            x: it.x,
            y: it.y,
          },
        })),
      },
    });
    if (result.affected === 0) {
      throw new Error('Certificate not found');
    }
    return this.repository.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error('Certificate not found');
    }

    return true;
  }
}
