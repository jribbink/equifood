import {
  RealtimeSubscriptionRequest,
  RealtimeUpdateMessage,
} from '@equifood/api-interfaces';
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../hooks';
import uuid from 'react-native-uuid';

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
    manager.current.setAuth(auth.token);
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
    [
      request: RealtimeSubscriptionRequest,
      callback: (msg: RealtimeUpdateMessage) => void
    ]
  > = new Map();
  private authenticated = false;
  private authToken: string | null = null;

  constructor(private host: string) {
    this.connect();
  }

  setAuth(token: string | null) {
    this.authToken = token;
    this.connect();
  }

  async connect() {
    if (!this.authToken) return;

    this.authenticated = false;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    this.socket = new WebSocket(this.host);
    this.socket.onclose = function (event) {
      _this.socket = null;
      _this.authenticated = false;
      setTimeout(() => {
        _this.connect();
      }, 1000);
    };
    this.socket.onopen = function (event) {
      this.send(JSON.stringify({ event: 'auth', data: _this.authToken }));
      for (const [data] of _this.listeners) {
        this.send(JSON.stringify({ event: 'subscribe', data }));
      }
    };
    this.socket.onmessage = function (event) {
      if (event.data === 'UNAUTHORIZED') {
        _this.authToken = null;
        _this.authenticated = false;
        _this.socket = null;
        return;
      } else if (event.data === 'AUTHENTICATED') {
        _this.authenticated = true;
      }
      console.log(event.data);
      return;
      const data: RealtimeUpdateMessage = JSON.parse(event.data);
      _this.listeners.get(data.target)?.[1]?.(data);
    };
  }

  async subscribe(entity: string, criteria: object, isArray = false) {
    if (!this.authenticated) {
      setTimeout(() => {
        this.subscribe(entity, criteria, isArray);
        console.log('TIMEOUT');
      }, 500);
      return;
    }
    const req: RealtimeSubscriptionRequest = {
      entity,
      criteria,
      key: uuid.v4().toString(),
    };
    const data = JSON.stringify(req);
    this.listeners.set(data, [req, console.log]);
    console.log(this.socket?.OPEN, {
      event: 'subscribe',
      data: JSON.stringify(data),
    });
    this.socket?.send(
      JSON.stringify({ event: 'subscribe', data: JSON.stringify(data) })
    );
  }
}
