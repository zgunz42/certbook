import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly repository: Repository<Certificate>,
  ) {}

  create(createCertificateDto: CreateCertificateDto) {
    const certificate = this.repository.create({
      ...createCertificateDto,
      templateData: {
        data: createCertificateDto.templateData.map((it) => ({
          name: it.name,
          position: {
            x: it.x,
            y: it.y,
          },
        })),
      },
    });

    return this.repository.save(certificate);
  }

  findAll(): Promise<Certificate[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Certificate> {
    return this.repository.findOne(id);
  }

  async update(
    id: number,
    updateCertificateDto: UpdateCertificateDto,
  ): Promise<Certificate> {
    const result = await this.repository.update(id, {
      ...updateCertificateDto,
      templateData: {
        data: updateCertificateDto.templateData.map((it) => ({
          name: it.name,
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
