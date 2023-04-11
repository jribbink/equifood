import { registerAs } from '@nestjs/config';

export default registerAs('uploads', () => ({
  path:
    process.env.UPLOADS_PATH ||
    (() => {
      throw new Error('Uploads path is required');
    })(),
  maxImageSize:
    parseInt(process.env.UPLOADS_IMAGE_SIZE_BYTES) ||
    (() => {
      throw new Error('Image size in bytes is required');
    })(),
  defaultUploadTimeout:
    parseInt(process.env.UPLOAD_TIMEOUT_MS) ||
    (() => {
      throw new Error('Upload timeout is required');
    })(),
}));
