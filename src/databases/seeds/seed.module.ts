import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificatesService } from '@/certificates/services/certificates.service';
import { CertificateEntity } from 'src/certificates/entities/certificate.entity';
import databaseConfig from 'src/common/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options = configService.get('database');
        console.log(options);

        return options;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CertificateEntity]),
  ],

  providers: [CertificatesService],
})
export class SeedModule {}
