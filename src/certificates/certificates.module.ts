import { Module } from '@nestjs/common';
import { CertificatesService } from '@/certificates/services/certificates.service';
import { CertificatesController } from '@/certificates/controllers/certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateEntity } from './entities/certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CertificateEntity])],
  controllers: [CertificatesController],
  providers: [CertificatesService],
})
export class CertificatesModule {}
