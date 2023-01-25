import { AxiosInstance } from 'axios';
import * as AppleAuthentication from 'expo-apple-authentication';

export default async ({ axios }: { axios: AxiosInstance }) => {
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  try {
    const { data: socialJwt } = await axios.post<string>(
      '/auth/apple',
      credential
    );
    return socialJwt;
  } catch (e) {
    return null;
  }
};
