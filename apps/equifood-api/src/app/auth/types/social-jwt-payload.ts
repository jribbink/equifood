import { AuthProviderType } from '@equifood/api-interfaces';
import passport from 'passport';

export interface SocialJwtPayload {
  providerType: AuthProviderType;
  profile: passport.Profile;
  accessToken?: string;
  refreshToken?: string;
}
