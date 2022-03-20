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
    // file header
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Cache-Control', 'must-revalidate');
    // file stream
    file.pipe(res);
  }
}
