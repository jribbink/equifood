import * as AppleAuthentication from 'expo-apple-authentication';
import { useDispatch } from 'react-redux';
import { setJWT } from '@equifood/ui-shared';
import { AppDispatch } from '../redux/store';
import { useAxios } from './useAxios';

export function useAppleAuth() {
  const axios = useAxios();
  const dispatch = useDispatch<AppDispatch>();

  const authenticate = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { data: jwt } = await axios.post<string>('/auth/apple', credential);
      dispatch(setJWT(jwt));
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
