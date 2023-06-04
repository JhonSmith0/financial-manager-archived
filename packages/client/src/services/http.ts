import axios, { Axios } from "axios";

class HTTP extends Axios {}

const api = axios.create({
  withCredentials: true,
  baseURL: "/",
});

export default api;
