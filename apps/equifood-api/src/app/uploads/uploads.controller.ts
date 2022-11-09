import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { NonceFileInterceptor } from './interceptors/nonce-file-interceptor';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private uploadsService: UploadsService,
    public configService: ConfigService
  ) {}

  @Post()
  @UseInterceptors(NonceFileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    return await this.uploadsService.uploadFile(file, req.upload_nonce);
  }

  @Get(':id/:name')
  async getUpload(
    @Param('id') id: string,
    @Param('name') name: string,
    @Res() res: any
  ) {
    const upload = await this.uploadsService.find(id, name);
    const file = createReadStream(join(cwd(), upload.path));
    file.pipe(res);
  }
}
