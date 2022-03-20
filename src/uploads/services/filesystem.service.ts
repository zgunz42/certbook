import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';

@Injectable()
export class FilesystemService {
  constructor(private readonly cofig: ConfigService) {}

  public getUploadsPath(): string {
    return this.cofig.get('filesystems.uploads.path');
  }

  public getUploadsUrl(): string {
    return this.cofig.get('filesystems.uploads.url');
  }

  public getStream(filePath: string): NodeJS.ReadableStream {
    return createReadStream(filePath);
  }
}
