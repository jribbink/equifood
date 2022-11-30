import { Expose, Transform } from 'class-transformer';
import { ManyToOne } from 'typeorm';
import { Upload } from '../../uploads/entities/upload.entity';

export function UploadColumn(opts = {}) {
  return (target: any, propertyKey: string | symbol) => {
    ManyToOne(() => Upload, { eager: true })(target, propertyKey);
  };
}
