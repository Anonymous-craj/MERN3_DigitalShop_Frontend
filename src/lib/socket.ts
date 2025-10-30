import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_SOCKET_URL ??
    "https://mern3-digitalshop-server-1.onrender.com",
  { autoConnect: false }
);

export function connectSocketWithToken(token: string | null) {
  socket.auth = token ? { token } : {};
  if (!socket.connected) socket.connect();
}
