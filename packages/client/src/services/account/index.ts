import { AccountCreate, IAccount, SearchAccount } from "@/interface";
import api from "../http";

export async function createAccount(data: AccountCreate) {
  return (await api.post("/api/account", data)).data as IAccount;
}

export async function searchAccounts(data: SearchAccount) {
  return (await api.get("/api/account/search", { params: data })).data;
}

export async function removeAccount(id: string) {
  return await api.delete(`/api/account/${id}`);
}
