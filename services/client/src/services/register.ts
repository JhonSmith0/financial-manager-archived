import { IRegisterSchema } from "@/interface"
import api from "./http"

export default async function register(data: IRegisterSchema) {
    return (await api.post("/auth/register", data)).data
}
