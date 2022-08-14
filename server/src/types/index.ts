// Program types

export type IMessage = {
  author: string,
  message: string,
  color: string
}

//Socket interfaces

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  sendMessage: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export type IServer = ServerToClientEvents & ClientToServerEvents & InterServerEvents & SocketData