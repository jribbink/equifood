import { AuthProviderType } from '../types/auth-provider-type';

export interface AuthProvider {
  providerKey: string;
  providerId: string;
  providerType: AuthProviderType;
  accountEmail: string;
}
