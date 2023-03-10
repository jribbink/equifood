import * as AppleAuthentication from 'expo-apple-authentication';
import { useAuth } from './useAuth';
import { useAxios } from './useAxios';

export function useAppleAuth() {
  const axios = useAxios();
  const { setJwt } = useAuth();

  const authenticate = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { data: jwt } = await axios.post<string>('/auth/apple', credential);
      setJwt(jwt);
    } catch (e: any) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  return { authenticate };
}
