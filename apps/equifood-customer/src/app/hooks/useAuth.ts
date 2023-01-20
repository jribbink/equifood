import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setJWT } from '../redux/slices/auth-slice';
import { RootState } from '../redux/store';
import { parseJwt } from '../util/jwt';

export function useAuth() {
  const store = useStore<RootState>();
  const dispatch = useDispatch();
  const jwt = useSelector<RootState, string | null>(
    () => store.getState().auth.jwt
  );

  useEffect(() => {
    if (!jwt) return;

    const { payload } = parseJwt(jwt);
    if (!payload.exp) return;
    const timeout =
      new Date().getTime() - new Date(payload.exp * 1000).getTime();

    setTimeout(() => {
      dispatch(setJWT(null));
    }, Math.max(timeout, 0));
  });

  return {
    token: jwt,
  };
}
