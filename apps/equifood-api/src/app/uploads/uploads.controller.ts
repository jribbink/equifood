import {
  Body,
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
import { ApiBody, ApiConsumes, ApiHeader } from '@nestjs/swagger';
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiHeader({
    name: '',
  })
  @UseInterceptors(NonceFileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    return await this.uploadsService.uploadFile(file, req.upload_nonce);
  }

  @Post(':id/:name/update')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiHeader({
    name: '',
  })
  @UseInterceptors(NonceFileInterceptor('file'))
  async updateFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Param('id') id: string,
    @Param('name') name: string
  ) {
    await this.uploadsService.deleteFile(id);
    return await this.uploadsService.uploadFile(file, req.upload_nonce);
  }

  @Get(':id/:name/')
  async getUpload(
    @Param('id') id: string,
    @Param('name') name: string,
    @Res() res: any
  ) {
    const upload = await this.uploadsService.find(id, name);
    const file = createReadStream(join(cwd(), upload.path));
    res.setHeader('Content-Type', upload.mime_type);
    file.pipe(res);
  }
}
