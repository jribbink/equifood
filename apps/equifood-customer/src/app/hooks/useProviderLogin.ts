import { AuthProviderConfig, useAuth, useAxios } from '@equifood/ui-shared';

export function useProviderLogin() {
  const { setJwt } = useAuth();
  const axios = useAxios();

  async function loginWithProvider(provider: AuthProviderConfig) {
    const socialJwt = await provider.strategy({ axios });
    const { data: jwt } = await axios.post<string>(`/auth/social-jwt`, null, {
      headers: { Authorization: `Bearer ${socialJwt}` },
    });
    setJwt(jwt);
  }

  return { loginWithProvider };
}
