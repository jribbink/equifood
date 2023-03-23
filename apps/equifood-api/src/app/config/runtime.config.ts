import { registerAs } from '@nestjs/config';

export default registerAs('runtime', () => ({
  port: process.env.PORT || 3333,
}));
