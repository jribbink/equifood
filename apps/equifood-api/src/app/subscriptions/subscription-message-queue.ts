const MESSAGE_DELAY = 500;

export class SubscriptionMessageBuffer {
  public queue: Map<string, WebSocket> = new Map();
  private interval: ReturnType<typeof setInterval>;

  constructor() {
    this.start();
  }

  start() {
    this.stop();
    this.interval = setInterval(() => {
      this.dispatchMessages();
    }, MESSAGE_DELAY);
  }

  stop() {
    clearInterval(this.interval);
  }

  enqueue(socket: WebSocket, key: string) {
    this.queue.set(key, socket);
  }

  private dispatchMessages() {
    if (this.queue.size === 0) return;
    this.queue.forEach((socket, key) => {
      socket.send(key);
    });
    this.queue.clear();
  }
}
