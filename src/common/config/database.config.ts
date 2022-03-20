import { UserEntity } from '@/users/enitites/user.entity';
import { registerAs } from '@nestjs/config';
import { CertificateEntity } from 'src/certificates/entities/certificate.entity';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  syncronize: process.env.NODE_ENV === 'development',
  entities: [CertificateEntity, UserEntity],
}));
