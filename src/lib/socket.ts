import { io } from "socket.io-client";

const SOCKET_URL =
  (import.meta.env.VITE_SOCKET_URL as string) ?? "http://localhost:3000";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"], // safer on Render
  withCredentials: false,
  path: "/socket.io", // you're using Bearer token, not cookies
});

export function connectSocketWithToken(token: string | null) {
  socket.auth = token ? { token } : {};
  if (!socket.connected) socket.connect();
}
