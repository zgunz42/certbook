import { UserEntity } from '@/users/enitites/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificateEntity } from '../entities/certificate.entity';

@Injectable()
export class CertificateRepository {
  constructor(
    @InjectRepository(CertificateEntity)
    private readonly repository: Repository<CertificateEntity>,
  ) {}

  async create(certificate: CertificateEntity): Promise<CertificateEntity> {
    return this.repository.save(certificate);
  }

  async findAll(): Promise<CertificateEntity[]> {
    return this.repository.find();
  }

  async findOne(id: Pick<CertificateEntity, 'id'>): Promise<CertificateEntity> {
    return this.repository.findOne(id);
  }

  async update(certificate: CertificateEntity): Promise<CertificateEntity> {
    const result = await this.repository.update(certificate.id, certificate);
    if (result.affected === 0) {
      throw new Error('Certificate not found');
    }
    return this.repository.findOne(certificate.id);
  }

  async delete(id: Pick<CertificateEntity, 'id'>): Promise<void> {
    await this.repository.delete(id);
  }
}
