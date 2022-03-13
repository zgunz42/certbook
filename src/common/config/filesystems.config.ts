import { registerAs } from '@nestjs/config';

export default registerAs('filesystems', () => ({
  uploads: {
    path: './public/data/uploads/',
  },
}));
