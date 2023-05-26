import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "api",
});

export default api;
