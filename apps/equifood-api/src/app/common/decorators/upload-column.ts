import { Expose, Transform } from 'class-transformer';
import { ManyToOne } from 'typeorm';
import { Upload } from '../../uploads/entities/upload.entity';

export function UploadColumn(opts = {}) {
  return (target: any, propertyKey: string | symbol) => {
    const exposedName = `${String(propertyKey)}_url`;
    Transform((v) => {
      const upload: Upload = v.value;
      const fn = (req) =>
        `${req.protocol}://${req.headers.host}/api/uploads/${upload.id}/${upload.filename}`;
      Object.defineProperty(fn, '__isDynamic', { value: true });
      return fn;
    })(target, propertyKey);
    Expose({ name: exposedName })(target, propertyKey);
    ManyToOne(() => Upload, { eager: true })(target, propertyKey);
  };
}
