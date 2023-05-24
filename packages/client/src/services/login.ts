import { ILoginSchema } from "@/interface";
import api from "./api";

export default async function login(data: ILoginSchema) {
  return await api.post("/auth/login", data);
}
