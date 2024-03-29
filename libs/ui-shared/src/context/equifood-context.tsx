import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { storage } from '../util/storage';
import { RealtimeContextProvider } from './realtime-context';

export interface IEquifoodConfig {
  apiUrl: string;
  wsUrl: string;
}

export interface IEquifoodAuthContext {
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
  authenticate: (params: { email: string; password: string }) => void;
}

export const EquifoodConfigContext =
  React.createContext<IEquifoodConfig | null>(null);

export const EquifoodAuthContext = React.createContext<IEquifoodAuthContext>({
  jwt: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setJwt: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  authenticate: () => {},
});

interface EquifoodCoreContextProps {
  config: IEquifoodConfig;
  children: React.ReactNode;
}

export function EquifoodCoreContext({
  config,
  children,
}: EquifoodCoreContextProps) {
  const [jwt, setJwtRaw] = useState<string | null>(null);

  const authenticate = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post<string | null>(
      '/auth/local',
      {
        email,
        password,
      },
      { baseURL: config.apiUrl }
    );
    setJwt(response.data);
  };

  const setJwt = async (jwt: string | null) => {
    await storage.set('jwt', jwt);
    setJwtRaw(jwt);
  };

  useEffect(() => {
    (async () => {
      setJwtRaw(await storage.get('jwt'));
    })();
  }, []);

  return (
    <EquifoodConfigContext.Provider value={config}>
      <EquifoodAuthContext.Provider
        value={{
          jwt,
          setJwt,
          authenticate,
        }}
      >
        <RealtimeContextProvider url={config.wsUrl}>
          {children}
        </RealtimeContextProvider>
      </EquifoodAuthContext.Provider>
    </EquifoodConfigContext.Provider>
  );
}
