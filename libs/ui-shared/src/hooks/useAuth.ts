import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setJWT } from '../redux/slices/auth-slice';
import { parseJwt } from '../util/jwt';

export function useAuth() {
  const store = useStore();
  const dispatch = useDispatch();
  const jwt = useSelector<any, string | null>(() => store.getState().auth.jwt);

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
