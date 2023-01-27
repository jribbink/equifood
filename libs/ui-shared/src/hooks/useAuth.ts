import { useContext, useEffect } from 'react';
import { EquifoodAuthContext } from '../context';
import { parseJwt } from '../util/jwt';

export function useAuth() {
  const { jwt, setJwt, authenticate } = useContext(EquifoodAuthContext);

  useEffect(() => {
    if (!jwt) return;

    const { payload } = parseJwt(jwt);
    if (!payload.exp) return;
    const timeout =
      new Date().getTime() - new Date(payload.exp * 1000).getTime();

    setTimeout(() => {
      setJwt(null);
    }, Math.max(timeout, 0));
  });

  return {
    token: jwt,
    authenticate,
    setJwt,
  };
}
