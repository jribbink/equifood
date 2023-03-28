import { RealtimeUpdateMessage } from '@equifood/api-interfaces';
import React, { useEffect, useRef } from 'react';
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
  useEffect(() => {
    manager.current.connect();
  }, []);

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
    [callback: (msg: RealtimeUpdateMessage) => void, resubscribe: () => void]
  > = new Map();
  public swrCache: Map<string, string> = new Map();

  constructor(private host: string) {
    this.connect();
  }

  connect() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    this.socket?.close();
    this.socket = new WebSocket(this.host);
    this.socket.onclose = function () {
      _this.socket = null;
      setTimeout(() => {
        _this.connect();
      }, 1000);
    };
    this.socket.onopen = function () {
      for (const [key, [, resubscribe]] of _this.listeners) {
        resubscribe();
        _this.listeners.delete(key);
      }
    };
    this.socket.onmessage = function (event) {
      const data: RealtimeUpdateMessage = JSON.parse(event.data);
      console.log(data.key);
      _this.listeners.get(data.key)?.[0]?.(data);
    };
  }

  async subscribe(
    token: string,
    cb: (msg: RealtimeUpdateMessage) => void,
    resubscribe: () => void
  ) {
    const key: string = parseJwt(token).payload.key;

    // Add listener
    this.listeners.set(key, [cb, resubscribe]);

    // Send listener to server
    this.socket?.send(JSON.stringify({ event: 'subscribe', data: token }));
  }

  async unsubscribe(key: string) {
    if (!this.listeners.has(key)) return;

    this.listeners.delete(key);
    this.socket?.send(JSON.stringify({ event: 'unsubscribe', data: key }));
  }
}
