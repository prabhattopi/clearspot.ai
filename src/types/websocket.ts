export interface WebSocketMessage<T = unknown> {
    event: string;
    data: T;
    timestamp?: number;
  }
  
  export interface WebSocketHook<T = unknown> {
    isConnected: boolean;
    lastMessage: WebSocketMessage<T> | null;
    sendMessage: (event: string, data: unknown) => void;
    reconnect: () => void;
  }