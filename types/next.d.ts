import type { NextApiResponse } from "next";
import type { Server as NetServer, Socket } from "net";
import type { Server as SocketIOServer } from "socket.io";

export interface CustomSocket extends Socket {
  server: NetServer & {
    io: SocketIOServer;
  };
}

export interface NextApiResponseServerIO extends NextApiResponse {
  socket: CustomSocket;
}
