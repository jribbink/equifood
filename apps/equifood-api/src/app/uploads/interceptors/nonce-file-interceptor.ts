import {
  CallHandler,
  ExecutionContext,
  Inject,
  mixin,
  NestInterceptor,
  Optional,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
import multer, { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import _uploadsConfig from '../../config/uploads.config';
import { Upload } from '../entities/upload.entity';
import { UploadNonce } from '../models/upload-nonce';
import { transformException } from '../multer/multer.utils';
import { UploadsService } from '../uploads.service';
import { randomUUID } from 'crypto';

const MULTER_MODULE_OPTIONS = 'MULTER_MODULE_OPTIONS';

type MulterInstance = any;
type MulterLimits = {
  fieldNameSize?: number;
  fieldSize?: number;
  fields?: number;
  fileSize?: number;
  files?: number;
  parts?: number;
  headerPairs?: number;
};

type EnhancedLimits =
  | MulterLimits
  | ((req: any, res: any, next: any) => MulterLimits);

type EnhancedMulterOptions = Omit<MulterModuleOptions, 'limits'> & {
  limits?: EnhancedLimits;
};

export function NonceFileInterceptor(
  fieldName: string,
  localOptions: Omit<MulterOptions, 'storage' | 'limits'> = {}
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    protected multer: MulterInstance;
    private limits?: EnhancedLimits;

    constructor(
      @Optional()
      @Inject(MULTER_MODULE_OPTIONS)
      globalOptions: EnhancedMulterOptions = {},
      @Inject(_uploadsConfig.KEY)
      private uploadsConfig: ConfigType<typeof _uploadsConfig>,
      @Inject(UploadsService)
      private uploadsService: UploadsService,
      @InjectRepository(Upload)
      private uploadRepository: Repository<Upload>
    ) {
      this.multer = (multer as any)({
        ...globalOptions,
        ...localOptions,
      });
    }

    async intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      const req = ctx.getRequest();
      const res = ctx.getResponse();

      const nonce = await this.resolveNonce(req);
      if (new Date() > nonce.expires)
        throw new UnauthorizedException('Nonce expired');
      this.multer.limits = this.resolveLimits(req);
      this.multer.storage = this.resolveStorage(req);

      await new Promise<void>((resolve, reject) =>
        this.multer.single(fieldName)(req, res, (err: any) => {
          if (err) {
            const error = transformException(err);
            return reject(error);
          }
          resolve();
        })
      );
      return next.handle();
    }

    async resolveNonce(req: any): Promise<UploadNonce> {
      const token = req.headers['upload-token'];
      try {
        req.upload_nonce = this.uploadsService.decodeNonce(token);
      } catch (e) {
        throw new UnauthorizedException();
      }

      return req.upload_nonce;
    }

    resolveLimits(req: any): MulterLimits {
      const nonce = (req as any).upload_nonce;
      return {
        files: 1,
        fileSize: nonce.maxSizeBytes,
      };
    }

    resolveStorage(req: any): multer.StorageEngine {
      return diskStorage({
        destination: this.uploadsConfig.path,
        filename: (req, file, callback) => {
          callback(null, randomUUID());
        },
      });
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor;
}
