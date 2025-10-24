import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_SOCKET_URL ?? "http://localhost:3000",
  { autoConnect: false }
);

export function connectSocketWithToken(token: string | null) {
  socket.auth = token ? { token } : {};
  if (!socket.connected) socket.connect();
}
