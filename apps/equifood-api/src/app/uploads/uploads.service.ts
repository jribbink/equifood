import { Inject, Injectable } from '@nestjs/common';
import crypto, { randomUUID } from 'crypto';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  BaseEntity,
  DataSource,
  EntityMetadata,
  FindOptionsWhere,
  ObjectLiteral,
  ObjectType,
  Repository,
  UpdateQueryBuilder,
} from 'typeorm';
import jsonwebtoken from 'jsonwebtoken';
import { UploadNonce } from './models/upload-nonce';
import { Upload } from './entities/upload.entity';
import { extname } from 'path';
import _uploadsConfig from '../config/uploads.config';
import _authConfig from '../config/auth.config';

export type Newable<T> = { new (...args: any[]): T };

@Injectable()
export class UploadsService {
  private cipherKey = crypto
    .createHash('sha256')
    .update(this.authConfig.secret)
    .digest();

  private uploadsPath = this.uploadsConfig.path;

  private metadataTargetMap = new Map<ObjectType<unknown>, EntityMetadata>();
  private metadataNameMap = new Map<string, EntityMetadata>();

  constructor(
    @Inject(_uploadsConfig.KEY)
    private uploadsConfig: ConfigType<typeof _uploadsConfig>,
    @Inject(_authConfig.KEY) private authConfig: ConfigType<typeof _authConfig>,
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Upload) private uploadRepository: Repository<Upload>
  ) {
    this.dataSource.entityMetadatas.forEach((metadata) => {
      this.metadataTargetMap.set(metadata.target as any, metadata);
      this.metadataNameMap.set(metadata.tableName, metadata);
    });
  }

  async createNonce<Entity>(
    maxSizeBytes: number,
    targetTable: ObjectType<Entity>,
    targetColumn?: keyof Entity,
    targetWhere?: FindOptionsWhere<Entity>
  ) {
    const expires = new Date();
    expires.setTime(
      expires.getTime() + this.uploadsConfig.defaultUploadTimeout
    );
    const entityMetadata = this.metadataTargetMap.get(targetTable);
    const repository = this.dataSource.getRepository(entityMetadata.name);
    const entity = await repository.findOneBy(targetWhere);
    const nonce: UploadNonce = {
      previous_uuid: entity[targetColumn as string].id,
      expires,
      maxSizeBytes,
      targetTable: this.metadataTargetMap.get(targetTable).tableName,
      targetColumn: targetColumn as string,
      targetWhere,
    };

    return jsonwebtoken.sign(nonce, this.cipherKey);
  }

  createImageNonce<Entity>(
    targetTable: ObjectType<Entity>,
    targetColumn?: keyof Entity,
    targetWhere?: FindOptionsWhere<Entity>
  ) {
    return this.createNonce(
      this.uploadsConfig.maxImageSize,
      targetTable,
      targetColumn,
      targetWhere
    );
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
      const entityMetadata = this.metadataNameMap.get(uploadInfo.targetTable);
      const repository = this.dataSource.getRepository(entityMetadata.name);
      const entity = await repository.findOneBy(uploadInfo.targetWhere);
      await repository.save({
        ...entity,
        [uploadInfo.targetColumn]: fileRow,
      });
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
