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

export async function updateAccount(id: string, data: AccountCreate) {
  return (await api.patch(`/api/account/${id}`, data)).data as IAccount;
}

export async function readAccount(id: string) {
  return (await api.get(`/api/account/${id}`)).data as IAccount;
}
