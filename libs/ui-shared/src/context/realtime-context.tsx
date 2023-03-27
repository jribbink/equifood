import { RealtimeUpdateMessage } from '@equifood/api-interfaces';
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../hooks';
import { parseJwt } from '../util';

export const RealtimeContext = React.createContext<RealtimeManager | null>(
  null
);

export function RealtimeContextProvider({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) {
  const manager = useRef(new RealtimeManager(url));
  const auth = useAuth();
  useEffect(() => {
    (async () => {
      await manager.current.authenticate(auth.token);
    })();
  }, [auth]);

  return (
    <RealtimeContext.Provider value={manager.current}>
      {children}
    </RealtimeContext.Provider>
  );
}

class RealtimeManager {
  private socket: WebSocket | null = null;
  private listeners: Map<
    string,
    [token: string, callback: (msg: RealtimeUpdateMessage) => void]
  > = new Map();

  private authToken: string | null = null;
  private authenticationPromise: Promise<void> | null = null;
  private resolveAuthentication: (() => void) | null = null;
  private rejectAuthentication: (() => void) | null = null;

  constructor(private host: string) {
    this.connect();
  }

  async authenticate(token: string | null) {
    this.authToken = token;
    this.connect();

    // Wait for authentication
    await this.authenticationPromise;
  }

  private resetAuth() {
    this.authenticationPromise = new Promise<void>((resolve, reject) => {
      this.resolveAuthentication = resolve;
      this.rejectAuthentication = reject;
    });
  }

  async connect() {
    if (!this.authToken) return;

    this.resetAuth();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    this.socket?.close();
    this.socket = new WebSocket(this.host);
    this.socket.onclose = function (event) {
      _this.socket = null;
      _this.resetAuth();
      setTimeout(() => {
        _this.connect();
      }, 1000);
    };
    this.socket.onopen = function (event) {
      this.send(JSON.stringify({ event: 'auth', data: _this.authToken }));

      console.log('HANDLE RECONNECT');
      /*_this.authenticationPromise
        ?.then(() => {
          for (const [, [req]] of _this.listeners) {
            this.send(
              JSON.stringify({ event: 'subscribe', data: JSON.stringify(req) })
            );
          }
        })
        .catch(() => {
          throw new Error('Websocket unauthorized');
        });*/
    };
    this.socket.onmessage = function (event) {
      if (event.data === 'UNAUTHORIZED') {
        _this.authToken = null;
        _this.rejectAuthentication?.();
        _this.socket?.close();
        _this.socket = null;
        return;
      } else if (event.data === 'AUTHENTICATED') {
        _this.resolveAuthentication?.();
      } else {
        const data: RealtimeUpdateMessage = JSON.parse(event.data);
        _this.listeners.get(data.key)?.[1]?.(data);
      }
    };
  }

  async subscribe(token: string, cb: (msg: RealtimeUpdateMessage) => void) {
    const key: string = parseJwt(token).payload.key;

    // Add listener
    this.listeners.set(key, [token, cb]);

    // Wait for authentication
    await this.authenticationPromise;

    // Send listener to server
    this.socket?.send(JSON.stringify({ event: 'subscribe', data: token }));
  }
}
