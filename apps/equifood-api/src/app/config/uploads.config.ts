import { registerAs } from '@nestjs/config';

export default registerAs('uploads', () => ({
  path:
    process.env.UPLOADS_PATH ||
    (() => {
      throw new Error('Uploads path is required');
    })(),
}));
