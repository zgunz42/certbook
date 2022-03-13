import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CertificatesService } from '@/certificates/services/certificates.service';
import { CreateCertificateDto } from '@/certificates/dto/create-certificate.dto';
import { UpdateCertificateDto } from '@/certificates/dto/update-certificate.dto';
import { CaseInterceptor } from '@/common/interceptor/case.interceptor';
import { diskStorage } from 'multer';

@Controller('certificates')
@UseInterceptors(CaseInterceptor)
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/data/uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}-${file.originalname}`);
        },
      }),
    }),
  )
  create(
    @Body()
    createCertificateDto: CreateCertificateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file.mimetype !== 'application/pdf') {
      throw new Error('Invalid file type');
    }

    createCertificateDto.templateFile = file.path;
    return this.certificatesService.create(createCertificateDto);
  }

  @Get()
  findAll() {
    return this.certificatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificatesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateCertificateDto.templateFile = file.path;
    }
    return this.certificatesService.update(+id, updateCertificateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificatesService.remove(+id);
  }
}
