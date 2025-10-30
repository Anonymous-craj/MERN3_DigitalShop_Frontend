import axios from "axios";

const API = axios.create({
  baseURL: "https://mern3-digitalshop-server-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const APIWITHTOKEN = axios.create({
  baseURL: "https://mern3-digitalshop-server-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

export { API, APIWITHTOKEN };
