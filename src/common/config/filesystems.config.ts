import { registerAs } from '@nestjs/config';

export default registerAs('filesystems', () => ({
  uploads: {
    path: process.env.UPLOADS_PATH || './public/data/uploads',
    url: process.env.UPLOADS_URL || 'http://localhost:3000/file',
  },
}));
