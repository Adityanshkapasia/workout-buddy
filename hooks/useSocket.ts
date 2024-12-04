import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(process.env.NEXT_PUBLIC_API_URL || "", {
      path: "/api/socketio",
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketIo.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socketIo.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
    });

    socketIo.on("reconnect", (attemptNumber) => {
      console.log(
        `Reconnected to Socket.IO server after ${attemptNumber} attempts`
      );
    });

    socketIo.on("reconnect_error", (error) => {
      console.error("Socket.IO reconnection error:", error);
    });

    socketIo.on("disconnect", (reason) => {
      console.log("Disconnected from Socket.IO server:", reason);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
};
