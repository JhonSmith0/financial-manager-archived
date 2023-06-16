import api from "./http";

export default async function me() {
  return (await api.get("/auth/me")).data;
}

