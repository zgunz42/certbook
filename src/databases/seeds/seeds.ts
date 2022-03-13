import { NestFactory } from '@nestjs/core';
import { CertificateSeed } from './certificate-seed.service';
import { SeedModule } from './seed.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const bookSeeder = appContext.get(CertificateSeed);
  await bookSeeder.seed();

  await appContext.close();
}

bootstrap();
