/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Res } from '@nestjs/common';
import { createReadStream } from 'fs';

@Controller('/file')
export class UploadsController {
  @Get(':filename')
  async getFile(@Res() res, @Param('filename') filename: string) {
    const filePath = `./public/data/uploads/${filename}`;
    const file = createReadStream(filePath);

    file.pipe(res);
  }
}
