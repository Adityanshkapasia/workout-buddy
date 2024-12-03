import type { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import type { Socket } from "net";

interface CustomSocket extends Socket {
  server: NetServer & {
    io: SocketIOServer;
  };
}

interface CustomNextApiResponse extends NextApiResponse {
  socket: CustomSocket;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: CustomNextApiResponse) => {
  if (!res.socket.server.io) {
    const path = "/api/socketio";
    const httpServer = res.socket.server as unknown as NetServer;
    const io = new SocketIOServer(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("join", (room: string) => {
        socket.join(room);
        console.log(`Client joined room: ${room}`);
      });

      socket.on("leave", (room: string) => {
        socket.leave(room);
        console.log(`Client left room: ${room}`);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
  res.end();
};

export default ioHandler;
