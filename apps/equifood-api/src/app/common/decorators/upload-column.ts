import { Expose, Transform } from 'class-transformer';
import { ManyToOne } from 'typeorm';
import { Upload } from '../../uploads/entities/upload.entity';

function originalHost(req: any) {
  const app = req.app;
  const trustProxy = app && app.get && app.get('trust proxy');

  const proto = (req.headers['x-forwarded-proto'] || '').toLowerCase(),
    tls =
      req.connection.encrypted ||
      (trustProxy && 'https' == proto.split(/\s*,\s*/)[0]),
    host = (trustProxy && req.headers['x-forwarded-host']) || req.headers.host,
    protocol = tls ? 'https' : 'http';
  return {
    protocol,
    host,
  };
}

export function UploadColumn(opts = {}) {
  return (target: any, propertyKey: string | symbol) => {
    const exposedName = `${String(propertyKey)}_url`;
    Transform((v) => {
      const upload: Upload = v.value;
      const fn = (req) => {
        const { protocol, host } = originalHost(req);
        return `${protocol}://${host}/api/uploads/${upload.id}/${upload.filename}`;
      };
      Object.defineProperty(fn, '__isDynamic', { value: true });
      return fn;
    })(target, propertyKey);
    Expose({ name: exposedName })(target, propertyKey);
    ManyToOne(() => Upload, { eager: true })(target, propertyKey);
  };
}
