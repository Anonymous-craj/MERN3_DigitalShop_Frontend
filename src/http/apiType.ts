import axios from "axios";

// Pick API base from env
const BASE_URL = import.meta.env.VITE_API_URL as string;

// Plain instance (no token)
export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Authenticated instance
export const APIWITHTOKEN = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Always attach the latest token
APIWITHTOKEN.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // IMPORTANT: Bearer prefix
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});
