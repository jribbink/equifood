import { Injectable } from '@nestjs/common';
import crypto, { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  ObjectLiteral,
  Repository,
  UpdateQueryBuilder,
} from 'typeorm';
import jsonwebtoken from 'jsonwebtoken';
import { UploadNonce } from './models/upload-nonce';
import { Upload } from './entities/upload.entity';
import { extname } from 'path';

@Injectable()
export class UploadsService {
  private cipherKey = crypto
    .createHash('sha256')
    .update(this.configService.get('auth.secret'))
    .digest();

  private uploadsPath = this.configService.get('uploads.path');

  constructor(
    private configService: ConfigService,
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Upload) private uploadRepository: Repository<Upload>
  ) {}

  createNonce(
    maxSizeBytes: number,
    expiresInMs: number,
    targetTable?: string,
    targetColumn?: string,
    targetWhere?: object
  ) {
    const expires = new Date();
    expires.setTime(expires.getTime() + expiresInMs);
    const nonce: UploadNonce = {
      id: randomUUID(),
      expires,
      maxSizeBytes,
      targetTable,
      targetColumn,
      targetWhere,
    };

    return jsonwebtoken.sign(nonce, this.cipherKey);
  }

  decodeNonce(token: string): UploadNonce {
    const decryptedData = jsonwebtoken.verify(
      token,
      this.cipherKey
    ) as UploadNonce;
    decryptedData.expires = new Date(decryptedData.expires);

    return decryptedData;
  }

  async uploadFile(file: Express.Multer.File, uploadInfo: UploadNonce) {
    const fileRow = await this.uploadRepository.save({
      id: uploadInfo.id,
      filename: file.originalname,
      ext: extname(file.originalname),
      mime_type: file.mimetype,
      size: file.size,
      name: 'foobar',
      path: file.path,
    });

    if (
      uploadInfo.targetTable &&
      uploadInfo.targetColumn &&
      uploadInfo.targetWhere
    ) {
      this.dataSource.getRepository('');
      const entityMetadata = this.dataSource.entityMetadatas.find(
        (metadata) => metadata.tableName === uploadInfo.targetTable
      );

      // eslint-disable-next-line no-inner-declarations
      function pipeWhere(
        qb: UpdateQueryBuilder<ObjectLiteral>,
        whereConditions: object,
        first = true
      ): UpdateQueryBuilder<ObjectLiteral> {
        if (Object.keys(whereConditions).length == 0) return qb;
        const keys = [...Object.keys(whereConditions)];
        const currentKey = keys.pop();
        return pipeWhere(
          qb[first ? 'where' : 'andWhere'](`entity.${currentKey} = :value`, {
            value: whereConditions[currentKey],
          }),
          keys.reduce((acc, v) => {
            return {
              ...acc,
              v: whereConditions[v],
            };
          }, {})
        );
      }

      await pipeWhere(
        this.dataSource
          .getRepository(entityMetadata.name)
          .createQueryBuilder('entity')
          .update(entityMetadata.name, {
            [uploadInfo.targetColumn]: uploadInfo.id,
          }),
        []
      ).execute();
    }

    return fileRow;
  }

  async find(id: string, filename: string) {
    return this.uploadRepository.findOne({
      where: { id, filename },
    });
  }

  async deleteFile(id: string) {
    return this.uploadRepository.delete({ id: id });
  }
}
