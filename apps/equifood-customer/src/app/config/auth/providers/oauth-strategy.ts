import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { AxiosInstance } from 'axios';
import { AuthProviderType } from '@equifood/api-interfaces';

export default (provider: AuthProviderType) =>
  async ({ axios }: { axios: AxiosInstance }) => {
    WebBrowser.maybeCompleteAuthSession();
    const result = await WebBrowser.openAuthSessionAsync(
      `${
        axios.defaults.baseURL
      }/auth/${provider}?redirect_uri=${encodeURIComponent(
        Linking.createURL('/login', { queryParams: {} })
      )}`,
      null,
      {}
    );
    if (result.type === 'success') {
      const url = Linking.parse(result.url);
      const socialJwt = url.queryParams?.jwt as string;
      return socialJwt;
    }
    return null;
  };
