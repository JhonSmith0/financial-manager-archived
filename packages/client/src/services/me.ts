import api from "./api";

export default async function me() {
  return (await api.get("/auth/me")).data;
}
