import { ILoginSchema } from "@/interface";
import api from "./http";

export default async function login(data: ILoginSchema) {
	return await api.post("/auth/login", data);
}
