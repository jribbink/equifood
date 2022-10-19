import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  if (!process.env.AUTH_JWT_SECRET) {
    throw new Error('AUTH_JWT_SECRET must be provided');
  }

  return {
    secret: process.env.AUTH_JWT_SECRET,
  };
});
