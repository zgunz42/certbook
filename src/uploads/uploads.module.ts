import { Module } from '@nestjs/common';
import { UploadsController } from './controllers/uploads.controller';

@Module({
  imports: [],
  controllers: [UploadsController],
  providers: [],
})
export class UploadsModule {}
