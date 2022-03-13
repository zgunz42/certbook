import { UploadsModule } from '@/uploads/uploads.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificatesModule } from './certificates/certificates.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { configs } from '@/common/config';
@Module({
  imports: [
    UploadsModule,
    CertificatesModule,
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './public/data/uploads/',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
