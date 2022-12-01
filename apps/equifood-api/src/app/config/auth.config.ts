import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  if (!process.env.AUTH_JWT_SECRET) {
    throw new Error('AUTH_JWT_SECRET must be provided');
  }

  return {
    secret: process.env.AUTH_JWT_SECRET,
    openIdAudience: process.env.AUTH_OPENID_AUDEINCE,
    googleClientId: process.env.AUTH_GOOGLE_CLIENTID,
    googleSecret: process.env.AUTH_GOOGLE_SECRET,
    facebookClientId: process.env.AUTH_FACEBOOK_CLIENTID,
    facebookSecret: process.env.AUTH_FACEBOOK_SECRET,
  };
});
