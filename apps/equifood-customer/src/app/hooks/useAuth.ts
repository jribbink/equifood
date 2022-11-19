import { JWT, Merchant } from '@equifood/api-interfaces';
import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setJWT } from '../redux/slices/auth-slice';
import { RootState } from '../redux/store';

export function useAuth() {
  const store = useStore<RootState>();
  const dispath = useDispatch();
  const jwt = useSelector<RootState, JWT | null>(
    () => store.getState().auth.jwt
  );

  useEffect(() => {
    if (!jwt?.expires) return;
    const timeout = new Date().getTime() - new Date(jwt?.expires).getTime();

    setTimeout(() => {
      dispath(setJWT(null));
    }, timeout);
  });

  return {
    token: jwt?.access_token,
  };
}
